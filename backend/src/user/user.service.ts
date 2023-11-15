import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import fs from 'fs/promises';
import Fuse from 'fuse.js';
import { merge } from 'lodash';
import { PrismaService } from 'nestjs-prisma';
import path from 'path';
import { rimraf } from 'rimraf';
import sharp from 'sharp';
import * as uuid from 'uuid';
import { UserEntity } from '../common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { UserUpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async findOrCreate(data: Prisma.UserCreateInput) {
    const { authProviderId } = data;
    let user: User | null = null;
    let suffix = '';

    while (!user) {
      try {
        user = await this.prismaService.user.upsert({
          create: {
            ...data,
            displayName: `${data.displayName}${suffix}`,
          },
          update: {},
          where: { authProviderId },
        });
      } catch (error) {
        if (
          !(error instanceof PrismaClientKnownRequestError) ||
          error.code !== 'P2002'
        )
          throw error;

        // non unique displayName, generate random suffix
        suffix = `-${uuid.v4().substring(0, 5)}`;
      }
    }

    return UserEntity.fromUser(user);
  }

  async findById(id: User['id']) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user) return UserEntity.fromUser(user);
    return null;
  }

  async findByIdOrThrow(id: User['id']) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException();
    return user;
  }

  async findMany(query: UserQueryDTO, args: Prisma.UserFindManyArgs = {}) {
    const { search, ...rest } = query;

    args = merge(rest, args);

    if (search)
      args = merge(args, {
        where: {
          OR: [
            {
              displayName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              fullName: {
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
      const fuse = new Fuse(result, { keys: ['displayName', 'fullName'] });

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
          displayName: last?.displayName,
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

  async setAvatar(id: User['id'], filepath: string) {
    const filename = `${id}-${Date.now()}.png`;
    const directory = path.resolve('static/avatars');
    const output = `${directory}/${filename}`;
    const backend_url = this.configService.get('BACKEND_URL');
    const avatar = new URL(`/static/avatars/${filename}`, backend_url).href;

    await fs.mkdir(directory, { recursive: true });

    try {
      await sharp(filepath).resize(300, 300).toFile(output);
    } catch (error) {
      throw new BadRequestException('Invalid image');
    }

    const updated = await this.prismaService.user.update({
      where: { id },
      data: { avatar },
    });

    try {
      await rimraf(`${directory}/${id}-*`, { glob: { ignore: output } });
    } catch (error) {
      console.error(error); // print and ignore error
    }

    return UserEntity.fromUser(updated);
  }
}
