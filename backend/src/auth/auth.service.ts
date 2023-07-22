import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { JWTPayload } from 'src/common/types/express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateJWT(user: User, otp_is_verified: boolean) {
    const payload: JWTPayload = {
      id: user.id,
      otp_is_verified,
    };
    return this.jwtService.signAsync(payload);
  }

  async generateOTP(user: User) {
    let { otpSecret, username } = user;

    if (!otpSecret) otpSecret = authenticator.generateSecret();
    const app_name = this.configService.get('APP_NAME');
    const otp_url = authenticator.keyuri(username, app_name, otpSecret);

    return {
      otpSecret,
      qr_code: await toDataURL(otp_url),
      otp_url,
    };
  }

  verifyOTP(user: User, token: string) {
    if (!user.otpSecret) return false;
    return authenticator.verify({ secret: user.otpSecret, token });
  }
}
