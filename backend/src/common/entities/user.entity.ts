import { User } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { ClassTransformerGroups } from 'src/common/enum';
import { NotificationEntity } from './notification.entity';

export class UserEntity implements User {
  @Expose()
  firstTime: boolean;

  @Expose()
  PongMaster: boolean;

  @Expose()
  PongNovice: boolean;

  @Expose()
  PerfectDefense: boolean;

  @Expose()
  FirstVictory: boolean;

  @Expose()
  RookiePaddler: boolean;

  @Expose()
  SpeedRacer: boolean;

  @Expose()
  EasygoingRally: boolean;

  @Expose()
  FriendlyMatch: boolean;

  @Expose()
  id: number;

  @Exclude()
  authProviderId: string;

  @Expose()
  displayName: string;

  @Expose()
  fullName: string;

  @Expose()
  avatar: string | null;

  @Exclude()
  otpSecret: string | null;

  @Expose({ groups: [ClassTransformerGroups.GROUP_ME] })
  otpIsEnabled: boolean;

  @Expose()
  @Type(() => UserEntity)
  friends?: UserEntity[];

  @Expose()
  @Type(() => UserEntity)
  friendOf?: UserEntity[];

  @Expose()
  @Type(() => UserEntity)
  blocked?: UserEntity[];

  @Expose()
  @Type(() => UserEntity)
  blockedBy?: UserEntity[];

  @Expose()
  @Type(() => NotificationEntity)
  notifications?: NotificationEntity[];

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
