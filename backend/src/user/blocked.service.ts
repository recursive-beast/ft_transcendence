import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from '../common/entities/user.entity';

@Injectable()
export class BlockedService {
  constructor(private prismaService: PrismaService) {}

  async block(userId: User['id'], targetId: User['id']) {
    if (userId === targetId) throw new ConflictException();

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        blocked: {
          connect: { id: targetId },
        },
      },
      include: {
        blocked: {
          where: { id: targetId },
        },
      },
    });

    return UserEntity.fromUser(user.blocked[0]);
  }

  async unblock(userId: User['id'], targetId: User['id']) {
    if (userId === targetId) throw new ConflictException();

    const target = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: targetId,
      },
    });

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        blocked: {
          disconnect: { id: targetId },
        },
      },
      include: {
        blocked: {
          where: { id: targetId },
        },
      },
    });

    return UserEntity.fromUser(target);
  }

  async findMany(userId: User['id']) {
    return this.prismaService.user.findMany({
      where: {
        blockedBy: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
}
