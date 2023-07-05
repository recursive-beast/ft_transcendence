import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import ms from 'ms';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { JWTPayload } from './types/express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async jwtSendTokenCookie(
    user: User,
    otp_is_verified: boolean,
    response: Response,
  ) {
    const payload: JWTPayload = {
      id: user.id,
      otp_is_verified,
    };
    const token = await this.jwtService.signAsync(payload);

    response.cookie('token', token, {
      httpOnly: true,
      expires: new Date(
        Date.now() +
          ms(this.configService.get<string>('JWT_EXPIRES_IN', '24h')),
      ),
    });

    return token;
  }

  async otpGenerate(user: User) {
    let { otp_secret, display_name } = user;

    if (!otp_secret) otp_secret = authenticator.generateSecret();
    const app_name = this.configService.get('APP_NAME');
    const otp_url = authenticator.keyuri(display_name, app_name, otp_secret);

    return {
      otp_secret,
      qr_code: await toDataURL(otp_url),
      otp_url,
    };
  }

  otpVerify(user: User, token: string) {
    if (!user.otp_secret) return false;
    return authenticator.verify({ secret: user.otp_secret, token });
  }
}
