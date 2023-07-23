import { User } from '@prisma/client';
import { Expose, plainToInstance } from 'class-transformer';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from '../entities/user.entity';
import { keyBy } from 'lodash';
import { Injectable } from '@nestjs/common';

export class UserDTO extends UserEntity {
  @Expose()
  isFriend: boolean;

  @Expose()
  isBlocked: boolean;
}

@Injectable()
export class UserDTOFactory {
  constructor(private prismaService: PrismaService) {}

  async fromUser(user: User, currentUserId: User['id']): Promise<UserDTO>;
  async fromUser(user: User[], currentUserId: User['id']): Promise<UserDTO[]>;
  async fromUser(
    user: User | User[],
    currentUserId: User['id'],
  ): Promise<UserDTO | UserDTO[] | any> {
    const users = Array.isArray(user) ? user : [user];
    const ids = users.map(({ id }) => id);
    const result = await this.prismaService.user.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        _count: {
          select: {
            blockedBy: { where: { id: currentUserId } },
            friendOf: { where: { id: currentUserId } },
          },
        },
      },
    });
    const resultById = keyBy(result, 'id');
    const dtos = plainToInstance(UserDTO, users, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });

    for (const dto of dtos) {
      dto.isFriend = resultById[dto.id]._count.friendOf > 0;
      dto.isBlocked = resultById[dto.id]._count.blockedBy > 0;
    }

    if (Array.isArray(user)) return dtos;
    return dtos[0];
  }
}
