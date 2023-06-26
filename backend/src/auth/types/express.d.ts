import { User as PrismaUser } from '@prisma/client';
import { JWTPayload } from '../auth.service';

declare global {
  namespace Express {
    interface User {
      user: PrismaUser;
      jwtPayload?: JWTPayload;
    }
  }
}
