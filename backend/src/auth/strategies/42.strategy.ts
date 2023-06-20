import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy, '42') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('42_CLIENT_ID'),
      clientSecret: configService.get('42_CLIENT_SECRET'),
      callbackURL: configService.get('42_CALLBACK_URL'),
    });
  }

  async validate(accessToken, refreshToken, profile) {
    return profile._json;
  }
}
