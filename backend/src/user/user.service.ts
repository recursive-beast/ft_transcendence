import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

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
    return user;
  }

  async findById(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async setOTPSecret(id: number, secret: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { otp_secret: secret },
    });
  }

  async enableOTP(id: number) {
    return await this.prismaService.user.update({
      where: { id },
      data: { otp_is_enabled: true },
    });
  }

  async disableOTP(id: number) {
    return await this.prismaService.user.update({
      where: { id },
      data: { otp_is_enabled: false, otp_secret: null },
    });
  }
}
