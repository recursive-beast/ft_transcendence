import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(user: User) {
    Object.assign<UserEntity, User>(this, user);
  }

  id: number;

  login: string;

  first_name: string;

  last_name: string;

  usual_full_name: string;

  image: string;

  @Exclude()
  otp_secret: string | null;

  otp_is_enabled: boolean;

  created_at: Date;

  updated_at: Date;
}
