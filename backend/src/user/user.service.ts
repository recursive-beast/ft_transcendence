import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { merge } from 'lodash';
import { PrismaService } from 'nestjs-prisma';
import relevancy from 'relevancy';
import { UserEntity } from '../common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { UserUpdateDTO } from './dto/update.dto';
import Fuse from 'fuse.js';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOrCreate(data: Prisma.UserCreateInput) {
    const { fortyTwoId, googleId } = data;
    let user: User | null = null;
    let where: Prisma.UserWhereInput | null = null;

    if (fortyTwoId) where = { fortyTwoId };
    else if (googleId) where = { googleId };

    if (where) user = await this.prismaService.user.findFirst({ where });
    if (!user) user = await this.prismaService.user.create({ data });
    return UserEntity.fromUser(user);
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user) return UserEntity.fromUser(user);
    return null;
  }

  async findByIdOrThrow(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException();
    return user;
  }

  async findMany(
    query: UserQueryDTO,
    additionalArgs: Prisma.UserFindManyArgs = {},
  ) {
    const { search, ...rest } = query;
    const args = merge(rest, additionalArgs, {
      where: {
        OR: [
          {
            username: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    } as Prisma.UserFindManyArgs);
    const { distinct, where } = args;
    let result = await this.prismaService.user.findMany(args);
    const total = await this.prismaService.user.count({ distinct, where });
    const last = result[result.length - 1];

    if (query.search) {
      const fuse = new Fuse(result, { keys: ['username', 'fullname'] });

      result = fuse.search(query.search).map((elem) => elem.item);
    }

    return {
      meta: {
        total,
        pageSize: query.take,
        hasNextPage: query.cursor
          ? result.length >= query.take
          : query.skip + query.take < total,
        nextCursor: {
          id: last?.id,
          username: last?.username,
        },
      },
      data: UserEntity.fromUser(result),
    };
  }

  async update(id: User['id'], data: UserUpdateDTO) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return UserEntity.fromUser(updated);
  }
}
