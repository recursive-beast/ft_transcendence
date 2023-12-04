import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'nestjs-prisma';
import { CommonService } from 'src/common/common.service';
import * as uuid from 'uuid';
import { UserEntity } from '../common/entities/user.entity';
import { UserUpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private commonService: CommonService,
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

  async findMany() {
    const result = await this.prismaService.user.findMany();

    return UserEntity.fromUser(result);
  }

  async update(id: User['id'], data: UserUpdateDTO) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return UserEntity.fromUser(updated);
  }

  async setAvatar(id: User['id'], file: Express.Multer.File) {
    const url = await this.commonService.saveAvatar(`user-${id}`, file);
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { avatar: url },
    });

    return UserEntity.fromUser(updated);
  }
}
