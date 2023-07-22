import {
  Body,
  ConflictException,
  Controller,
  Get,
  Patch,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { OTPDTO } from './dto/otp.dto';
import { Public } from './public.decorator';
import { skipOTP } from './skip-otp.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42')
  async fortyTwo(@CurrentUser() user: UserEntity) {
    return {
      token: await this.authService.generateJWT(user, false),
    };
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google(@CurrentUser() user: UserEntity) {
    return {
      token: await this.authService.generateJWT(user, false),
    };
  }

  @skipOTP()
  @Patch('otp/generate')
  async otpGenerate(@CurrentUser() user: UserEntity) {
    const { otpSecret, qr_code } = await this.authService.generateOTP(user);

    if (!user.otpSecret)
      await this.userService.setOTPSecret(user.id, otpSecret);

    return { qr_code };
  }

  @skipOTP()
  @Patch('otp/enable')
  async otpEnable(@Body() body: OTPDTO, @CurrentUser() user: UserEntity) {
    if (user.otpIsEnabled || !user.otpSecret) throw new ConflictException();

    const success = this.authService.verifyOTP(user, body.otp);

    if (!success) throw new UnprocessableEntityException();
    await this.userService.enableOTP(user.id);
  }

  @Patch('otp/disable')
  async otpDisable(@CurrentUser() user: UserEntity) {
    await this.userService.disableOTP(user.id);

    const token = await this.authService.generateJWT(user, false);

    return { token };
  }

  @skipOTP()
  @Patch('otp/verify')
  async otpVerify(@Body() body: OTPDTO, @CurrentUser() user: UserEntity) {
    if (!user.otpIsEnabled) throw new ConflictException();

    const success = this.authService.verifyOTP(user, body.otp);

    if (!success) throw new UnprocessableEntityException();

    const token = await this.authService.generateJWT(user, true);

    return { token };
  }
}
