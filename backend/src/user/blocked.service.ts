import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserQueryDTO } from './dto/query.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Injectable()
export class BlockedService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

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

  async findMany(userId: User['id'], query: UserQueryDTO) {
    return this.userService.findMany(query, {
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
