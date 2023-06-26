import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOrCreate(data: Prisma.UserCreateInput) {
    const { forty_two_id, google_id } = data;
    let user: User | null = null;
    let where: Prisma.UserWhereInput | null = null;

    if (forty_two_id) where = { forty_two_id };
    else if (google_id) where = { google_id };

    if (where) user = await this.prismaService.user.findFirst({ where });
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
