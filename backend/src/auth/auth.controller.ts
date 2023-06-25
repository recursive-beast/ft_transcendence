import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { OTPDTO } from './otp-token.dto';
import { JWTGuard } from './guards/jwt.guard';
import {
  Controller,
  UseGuards,
  Req,
  Get,
  Res,
  Post,
  Body,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Public } from './public.decorator';

@UseGuards(JWTGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42')
  async callback_42(@Req() req, @Res({ passthrough: true }) res) {
    const token = await this.authService.jwtSendTokenCookie(
      req.user,
      false,
      res,
    );

    return { token };
  }

  @Post('otp/generate')
  async generate2FA(@Req() req) {
    const user: User = req.user;
    const { secret, QRCode } = await this.authService.otpGenerate(
      user.login,
      user.otp_secret,
    );

    if (!user.otp_secret) await this.userService.setOTPSecret(user.id, secret);

    return { QRCode };
  }

  @Post('otp/enable')
  async enable2fa(@Body() body: OTPDTO, @Req() req) {
    const user: User = req.user;

    if (user.otp_is_enabled || !user.otp_secret) throw new ConflictException();

    const success = this.authService.otpVerify(user.otp_secret, body.otp);

    if (!success) throw new UnprocessableEntityException();
    await this.userService.enableOTP(user.id);
  }

  @Post('otp/verify')
  async verify2fa(
    @Body() body: OTPDTO,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const user: User = req.user;

    if (!user.otp_is_enabled) throw new ConflictException();

    const success = this.authService.otpVerify(
      user.otp_secret as string,
      body.otp,
    );

    if (!success) throw new UnprocessableEntityException();

    const token = await this.authService.jwtSendTokenCookie(user, true, res);

    return { token };
  }
}
