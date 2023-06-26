import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOrCreate(data: Prisma.UserCreateInput) {
    let user = await this.findById(data.id);

    if (!user) user = await this.prismaService.user.create({ data });
    return new UserEntity(user);
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user) return new UserEntity(user);
    return null;
  }

  async setOTPSecret(id: number, secret: string) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { otp_secret: secret },
    });

    return new UserEntity(updated);
  }

  async enableOTP(id: number) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { otp_is_enabled: true },
    });

    return new UserEntity(updated);
  }
}
