import { Notification, NotificationType, Prisma } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { UserEntity } from './user.entity';

export class NotificationEntity implements Notification {
  @Expose()
  id: number;

  @Expose()
  type: NotificationType;

  @Expose()
  seen: boolean;

  @Expose()
  @Type(() => UserEntity)
  recipient?: UserEntity;

  @Exclude()
  recepientId: number;

  @Expose()
  data: Prisma.JsonValue;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromNotification(notification: Notification): NotificationEntity;
  static fromNotification(notification: Notification[]): NotificationEntity[];
  static fromNotification(
    notification: Notification | Notification[],
  ): NotificationEntity | NotificationEntity[] {
    return plainToInstance(NotificationEntity, notification, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
