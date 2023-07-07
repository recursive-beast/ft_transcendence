import { UserEntity } from 'src/user/user.entity';

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
