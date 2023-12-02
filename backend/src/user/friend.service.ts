import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from '../common/entities/user.entity';

@Injectable()
export class FriendService {
  constructor(private prismaService: PrismaService) {}

  async findById(userId: User['id'], targetId: User['id']) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: targetId,
        friendOf: {
          some: { id: userId },
        },
      },
    });

    if (user) return UserEntity.fromUser(user);
    return null;
  }

  async add(userId: User['id'], targetId: User['id']) {
    if (userId === targetId) throw new ConflictException();

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: targetId },
        },
      },
      include: {
        friends: {
          where: { id: targetId },
        },
      },
    });

    return UserEntity.fromUser(user.friends[0]);
  }

  async delete(userId: User['id'], targetId: User['id']) {
    if (userId === targetId) throw new ConflictException();

    const target = await this.prismaService.user.findUniqueOrThrow({
      where: { id: targetId },
    });

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: { id: targetId },
        },
      },
      include: {
        friends: {
          where: { id: targetId },
        },
      },
    });

    return UserEntity.fromUser(target);
  }

  async findMany(userId: User['id']) {
    return this.prismaService.user.findMany({
      where: {
        friendOf: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  async findManyMutual(userId: User['id'], targetId: User['id']) {
    return this.prismaService.user.findMany({
      where: {
        AND: [
          {
            friendOf: {
              some: { id: userId },
            },
          },
          {
            friendOf: {
              some: { id: targetId },
            },
          },
        ],
      },
    });
  }
}
