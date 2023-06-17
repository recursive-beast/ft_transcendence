import { User } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { ClassTransformerGroups } from 'src/common/enum';

export class UserEntity implements User {
  id: number;

  @Exclude()
  fortyTwoId: string | null;

  @Exclude()
  googleId: string | null;

  username: string;
  fullname: string;
  image: string | null;

  @Exclude()
  otpSecret: string | null;

  @Expose({ groups: [ClassTransformerGroups.GROUP_ME] })
  otpIsEnabled: boolean;

  @Type(() => UserEntity)
  friends?: UserEntity[];

  @Type(() => UserEntity)
  friendOf?: UserEntity[];

  @Type(() => UserEntity)
  blocked?: UserEntity[];

  @Type(() => UserEntity)
  blockedBy?: UserEntity[];

  createdAt: Date;
  updatedAt: Date;

  static fromUser(user: User | User[]) {
    return plainToInstance(UserEntity, user, { ignoreDecorators: true });
  }
}
