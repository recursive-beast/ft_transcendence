import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { pick } from 'lodash';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy, '42') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get('42_CLIENT_ID'),
      clientSecret: configService.get('42_CLIENT_SECRET'),
      callbackURL: configService.get('42_CALLBACK_URL'),
    });
  }

  async validate(accessToken, refreshToken, profile) {
    const data = pick(profile._json, [
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

    if (user) return { user };
  }
}
