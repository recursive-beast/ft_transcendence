import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { pick } from 'lodash';
import { Public } from './public.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
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

    // data.image is an object that contains avatar images of different sizes,
    // we only need the main image link
    data.image = data.image.link;

    const user = await this.userService.findOrCreate(data);

    return { token: await this.jwtService.signAsync({ id: user.id }) };
  }
}
