import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Response } from 'express';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';

export interface JWTPayload {
  id: User['id'];
  otp_is_verified: boolean;
}

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
        Date.now() + ms(this.configService.get('JWT_EXPIRES_IN') as string),
      ),
    });

    return token;
  }

  async otpGenerate(accountName: string, secret?: string | null) {
    if (!secret) secret = authenticator.generateSecret();
    const app_name = this.configService.get('APP_NAME');
    const otpUrl = authenticator.keyuri(accountName, app_name, secret);

    return {
      secret,
      QRCode: await toDataURL(otpUrl),
      otpUrl,
    };
  }

  otpVerify(secret: string, token: string) {
    return authenticator.verify({ secret, token });
  }
}
