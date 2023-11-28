import {
  Body,
  ConflictException,
  Controller,
  Get,
  Patch,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import ms from 'ms';
import { UserEntity } from 'src/common/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { OTPDTO } from './dto/otp.dto';
import { Public } from './public.decorator';
import { skipOTP } from './skip-otp.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42')
  async fortyTwo(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.generateJWT(user, false);

    this.sendAuthCookie(res, token);

    return { token, otp: { enabled: user.otpIsEnabled, verified: false } };
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.generateJWT(user, false);

    this.sendAuthCookie(res, token);

    return { token, otp: { enabled: user.otpIsEnabled, verified: false } };
  }

  @Public()
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authorization', { httpOnly: true });
  }

  @skipOTP()
  @Patch('otp/generate')
  async otpGenerate(@CurrentUser() user: UserEntity) {
    const { otpSecret, qr_code } = await this.authService.generateOTP(user);

    if (!user.otpSecret)
      await this.authService.setOTPSecret(user.id, otpSecret);

    return { qr_code };
  }

  @skipOTP()
  @Patch('otp/enable')
  async otpEnable(@Body() body: OTPDTO, @CurrentUser() user: UserEntity) {
    if (user.otpIsEnabled || !user.otpSecret) throw new ConflictException();

    const success = this.authService.verifyOTP(user, body.otp);

    if (!success) throw new UnprocessableEntityException();
    await this.authService.enableOTP(user.id);
  }

  @Patch('otp/disable')
  async otpDisable(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.disableOTP(user.id);

    const token = await this.authService.generateJWT(user, false);

    this.sendAuthCookie(res, token);

    return { token, otp: { enabled: false, verified: false } };
  }

  @skipOTP()
  @Patch('otp/verify')
  async otpVerify(
    @Body() body: OTPDTO,
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!user.otpIsEnabled) throw new ConflictException();

    const success = this.authService.verifyOTP(user, body.otp);

    if (!success) throw new UnprocessableEntityException();

    const token = await this.authService.generateJWT(user, true);

    this.sendAuthCookie(res, token);

    return { token, otp: { enabled: true, verified: true } };
  }

  private sendAuthCookie(res: Response, token: string) {
    res.cookie('authorization', token, {
      httpOnly: true,
      maxAge: ms('999years'),
    });
  }
}
