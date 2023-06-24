import { Controller, UseGuards, Req, Get, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42')
  async callback_42(@Req() req, @Res({ passthrough: true }) res) {
    const token = await this.jwtService.signAsync({ id: req.user.id });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + ms(this.configService.get('JWT_EXPIRES_IN') as string),
      ),
    });

    return { token };
  }
}
