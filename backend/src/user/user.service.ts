import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOrCreate(data: Prisma.UserCreateInput) {
    let user = await this.findById(data.id);

    if (!user) user = await this.prismaService.user.create({ data });
    return user;
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByIdOrThrow(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException();
    return user;
  }

  async setOTPSecret(id: number, secret: string) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        otp_secret: secret,
      },
    });
  }

  async enableOTP(id: number) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        otp_is_enabled: true,
      },
    });
  }
}
