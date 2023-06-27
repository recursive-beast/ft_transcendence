import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Res,
  UnprocessableEntityException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { JWTGuard } from './guards/jwt.guard';
import { OTPDTO } from './otp-token.dto';
import { TokenErrorFilter } from './token-error.filter';

@UseFilters(TokenErrorFilter)
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
  async fortyTwo() {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42/callback')
  async fortyTwoCallback(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    return {
      token: await this.authService.jwtSendTokenCookie(user, false, res),
    };
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google() {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleCallback(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    return {
      token: await this.authService.jwtSendTokenCookie(user, false, res),
    };
  }

  @Post('otp/generate')
  async otpGenerate(@CurrentUser() user: User) {
    const { otp_secret, qr_code } = await this.authService.otpGenerate(user);

    if (!user.otp_secret)
      await this.userService.setOTPSecret(user.id, otp_secret);

    return { qr_code };
  }

  @Post('otp/enable')
  async otpEnable(@Body() body: OTPDTO, @CurrentUser() user: User) {
    if (user.otp_is_enabled || !user.otp_secret) throw new ConflictException();

    const success = this.authService.otpVerify(user, body.otp);

    if (!success) throw new UnprocessableEntityException();
    await this.userService.enableOTP(user.id);
  }

  @Post('otp/verify')
  async otpVerify(
    @Body() body: OTPDTO,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    if (!user.otp_is_enabled) throw new ConflictException();

    const success = this.authService.otpVerify(user, body.otp);

    if (!success) throw new UnprocessableEntityException();

    const token = await this.authService.jwtSendTokenCookie(user, true, res);

    return { token };
  }
}
