import { Injectable } from '@nestjs/common';
import { Notification, Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { NotificationEntity } from 'src/common/entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async findMany(userId: User['id']) {
    const result = await this.prismaService.notification.findMany({
      where: { recipient: { id: userId } },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NotificationEntity.fromNotification(result);
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

  async markAsClicked(userId: User['id'], notificationId: Notification['id']) {
    const notification = await this.prismaService.notification.update({
      where: {
        recipient: { id: userId },
        id: notificationId,
      },
      data: { isClicked: true },
    });

    return NotificationEntity.fromNotification(notification);
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
