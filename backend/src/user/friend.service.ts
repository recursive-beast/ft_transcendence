import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from '../common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { UserService } from './user.service';

@Injectable()
export class FriendService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

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

  async findMany(userId: User['id'], query: UserQueryDTO) {
    return this.userService.findMany(query, {
      where: {
        friendOf: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  async findManyMutual(
    userId: User['id'],
    targetId: User['id'],
    query: UserQueryDTO,
  ) {
    return this.userService.findMany(query, {
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