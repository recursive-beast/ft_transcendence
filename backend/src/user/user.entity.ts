import { User } from '@prisma/client';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { GROUP_ME } from 'src/serialize-groups';

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

  @Expose({ groups: [GROUP_ME] })
  otp_is_enabled: boolean;

  created_at: Date;
  updated_at: Date;

  static fromUser(user: User) {
    return plainToInstance(UserEntity, user, { ignoreDecorators: true });
  }
}
