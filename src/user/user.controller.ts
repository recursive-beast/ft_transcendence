import { Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('user')
export class UserController {
  constructor(private prismaService: PrismaService) {}

  @Get('me')
  async me(@Req() req) {
    const user = await this.prismaService.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) throw new NotFoundException();
    return user;
  }
}
