import { Message } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { DirectConversationEntity } from './direct-conversation.entity';
import { GroupConversationEntity } from './group-conversation.entity';
import { UserEntity } from './user.entity';

export class MessageEntity implements Message {
  @Exclude()
  groupConversationId: number | null;

  @Exclude()
  directConversationId: number | null;

  @Expose()
  @Type(() => DirectConversationEntity)
  directConversation?: DirectConversationEntity;

  @Expose()
  @Type(() => GroupConversationEntity)
  groupConversation?: GroupConversationEntity;

  @Expose()
  id: number;

  @Expose()
  seen: boolean;

  @Expose()
  senderId: number;

  @Expose()
  sender: UserEntity;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromMessage(message: Message): MessageEntity;
  static fromMessage(message: Message[]): MessageEntity[];
  static fromMessage(
    message: Message | Message[],
  ): MessageEntity | MessageEntity[] {
    return plainToInstance(MessageEntity, message, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
