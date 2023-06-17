import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { pick } from 'lodash';
import { PrismaService } from 'src/prisma.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Post('42')
  async login_42() {
    return {};
  }

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42/callback')
  async callback_42(@Req() req) {
    const data = pick(req.user, [
      'id',
      'login',
      'first_name',
      'last_name',
      'usual_full_name',
      'image',
    ]);

    data.image = data.image.link;

    let user = await this.prismaService.user.findUnique({
      where: { id: data.id },
    });

    if (!user) await this.prismaService.user.create({ data });

    return { token: await this.jwtService.signAsync({ id: data.id }) };
  }
}
