import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
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

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const json = profile._json;

    const user = await this.userService.findOrCreate({
      fortyTwoId: String(json.id),
      username: json.login,
      fullname: json.displayname,
      image: json.image.link,
    });

    if (user) return { user };
  }
}
