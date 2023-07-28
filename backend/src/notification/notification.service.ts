import { Injectable } from '@nestjs/common';
import { Notification, Prisma, User } from '@prisma/client';
import { merge } from 'lodash';
import { PrismaService } from 'nestjs-prisma';
import { NotificationEntity } from 'src/common/entities/notification.entity';
import { NotificationQueryDTO } from './dto/query.dto';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async findMany(
    userId: User['id'],
    query: NotificationQueryDTO,
    args?: Prisma.NotificationFindManyArgs,
  ) {
    args = merge({ where: { recipient: { id: userId } } }, query, args);
    const { distinct, where } = args;
    const result = await this.prismaService.notification.findMany(args);
    const total = await this.prismaService.notification.count({
      distinct,
      where,
    });
    const last = result[result.length - 1];

    return {
      meta: {
        total,
        pageSize: query.take,
        hasNextPage: query.cursor
          ? result.length >= query.take
          : query.skip + query.take < total,
        nextCursor: {
          id: last?.id,
        },
      },
      data: NotificationEntity.fromNotification(result),
    };
  }

  async create(
    type: Notification['type'],
    recipientId: User['id'],
    data: Prisma.InputJsonValue,
  ) {
    const notification = await this.prismaService.notification.create({
      data: {
        type,
        data,
        recipient: { connect: { id: recipientId } },
      },
    });

    return NotificationEntity.fromNotification(notification);
  }

  async markSeen(userId: User['id']) {
    return this.prismaService.notification.updateMany({
      where: {
        recipient: { id: userId },
      },
      data: { seen: true },
    });
  }

  async countUnseen(userId: User['id']) {
    return await this.prismaService.notification.count({
      where: {
        recipient: { id: userId },
        seen: false,
      },
    });
  }
}
