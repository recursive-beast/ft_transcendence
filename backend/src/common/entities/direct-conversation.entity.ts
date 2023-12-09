import { DirectConversation } from '@prisma/client';
import { Expose, Type, plainToInstance } from 'class-transformer';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

export class DirectConversationEntity implements DirectConversation {
  @Expose()
  isGroup: boolean;

  @Expose()
  isDirect: boolean;

  @Expose()
  id: number;

  @Expose()
  @Type(() => MessageEntity)
  messages?: MessageEntity[];

  @Expose()
  @Type(() => UserEntity)
  members?: UserEntity[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromDirectConversation(
    DirectConversation: DirectConversation,
  ): DirectConversationEntity;
  static fromDirectConversation(
    DirectConversation: DirectConversation[],
  ): DirectConversationEntity[];
  static fromDirectConversation(
    directconversation: DirectConversation | DirectConversation[],
  ): DirectConversationEntity | DirectConversationEntity[] {
    return plainToInstance(DirectConversationEntity, directconversation, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
