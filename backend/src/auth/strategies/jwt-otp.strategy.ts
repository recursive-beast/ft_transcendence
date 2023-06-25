import { UserService } from 'src/user/user.service';
import { JWTPayload } from '../auth.service';
import { jwtExtractors } from './jwt.strategy';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTOTPStrategy extends PassportStrategy(Strategy, 'jwt-otp') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: jwtExtractors,
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userService.findById(payload.id);

    if (!user || (user.otp_is_enabled && !payload.otp_is_verified)) return null;
    return user;
  }
}
