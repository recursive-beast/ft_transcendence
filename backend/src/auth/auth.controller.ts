import {
  Body,
  ConflictException,
  Controller,
  Get,
  Patch,
  Res,
  UnprocessableEntityException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { Api0AuthUrl } from './decorators/swagger.decorator';
import { JWTGuard } from './guards/jwt.guard';
import { OTPGuard } from './guards/otp.guard';
import { OTPDTO } from './otp.dto';
import { TokenErrorFilter } from './token-error.filter';

@UseFilters(TokenErrorFilter)
@UseGuards(JWTGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Api0AuthUrl()
  @ApiOkResponse({ description: 'Returns a JWT token for authentication.' })
  @Public()
  @UseGuards(AuthGuard('42'))
  @Get('42')
  async fortyTwo(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserEntity,
  ) {
    return {
      token: await this.authService.jwtSendTokenCookie(user, false, res),
    };
  }

  @Api0AuthUrl()
  @ApiOkResponse({ description: 'Returns a JWT token for authentication.' })
  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserEntity,
  ) {
    return {
      token: await this.authService.jwtSendTokenCookie(user, false, res),
    };
  }

  @ApiOperation({
    summary: 'Generates an OTP secret and QR code for the current user.',
    description:
      'This endpoint generates a new OTP secret and encodes it in a QR code for the current authenticated user. If the user already has an OTP secret, the existing secret will not be changed.',
  })
  @ApiOkResponse({
    description: 'Returns The OTP secret encoded in a QR code.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  @Patch('otp/generate')
  async otpGenerate(@CurrentUser() user: UserEntity) {
    const { otp_secret, qr_code } = await this.authService.otpGenerate(user);

    if (!user.otp_secret)
      await this.userService.setOTPSecret(user.id, otp_secret);

    return { qr_code };
  }

  @ApiOperation({
    summary: 'Enable OTP for the current user',
    description:
      'Enables OTP authentication for the current authenticated user. Requires the user to provide an OTP code to verify their identity.',
  })
  @ApiOkResponse({ description: 'OTP authentication has been enabled.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiBadRequestResponse({
    description: 'Bad request due to invalid request body',
  })
  @ApiConflictResponse({
    description:
      'OTP is already enabled for the user or the user does not have an OTP secret.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The provided OTP code is invalid.',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  @Patch('otp/enable')
  async otpEnable(@Body() body: OTPDTO, @CurrentUser() user: UserEntity) {
    if (user.otp_is_enabled || !user.otp_secret) throw new ConflictException();

    const success = this.authService.otpVerify(user, body.otp);

    if (!success) throw new UnprocessableEntityException();
    await this.userService.enableOTP(user.id);
  }

  @ApiOperation({ summary: 'Disable OTP for the current user' })
  @ApiOkResponse({ description: 'OTP Disabled, Returns a new JWT token.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  @UseGuards(OTPGuard)
  @Patch('otp/disable')
  async otpDisable(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserEntity,
  ) {
    await this.userService.disableOTP(user.id);

    const token = await this.authService.jwtSendTokenCookie(user, false, res);

    return { token };
  }

  @ApiOperation({
    summary: 'Verify OTP for the current user',
    description:
      'Verify OTP for the current user. Requires the user to provide an OTP code to verify their identity.',
  })
  @ApiOkResponse({
    description: 'Successful OTP verification, Returns a new JWT token.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiBadRequestResponse({
    description: 'Bad request due to invalid request body',
  })
  @ApiConflictResponse({ description: 'OTP is not enabled for the user.' })
  @ApiUnprocessableEntityResponse({
    description: 'The provided OTP code is invalid.',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  @Patch('otp/verify')
  async otpVerify(
    @Body() body: OTPDTO,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserEntity,
  ) {
    if (!user.otp_is_enabled) throw new ConflictException();

    const success = this.authService.otpVerify(user, body.otp);

    if (!success) throw new UnprocessableEntityException();

    const token = await this.authService.jwtSendTokenCookie(user, true, res);

    return { token };
  }
}
