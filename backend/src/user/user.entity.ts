import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  @Exclude()
  forty_two_id: string | null;
  @Exclude()
  google_id: string | null;
  display_name: string;
  full_name: string;
  image: string | null;
  @Exclude()
  otp_secret: string | null;
  otp_is_enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
