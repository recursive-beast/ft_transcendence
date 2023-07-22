import { User } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { ClassTransformerGroups } from 'src/common/enum';

export class UserEntity implements User {
  @Expose()
  id: number;

  @Exclude()
  fortyTwoId: string | null;

  @Exclude()
  googleId: string | null;

  @Expose()
  username: string;

  @Expose()
  fullname: string;

  @Expose()
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

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromUser(user: User): UserEntity;
  static fromUser(user: User[]): UserEntity[];
  static fromUser(user: User | User[]): UserEntity | UserEntity[] {
    return plainToInstance(UserEntity, user, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
