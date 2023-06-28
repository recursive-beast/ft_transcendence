import { UserEntity } from 'src/user/user.entity';
import { JWTPayload } from '../auth.service';

export interface JWTPayload {
  id: UserEntity['id'];
  otp_is_verified: boolean;
}

declare global {
  namespace Express {
    interface User {
      user: UserEntity;
      jwtPayload?: JWTPayload;
    }
  }
}
