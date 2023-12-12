import { GroupConversation, groupType } from '@prisma/client';
import { Expose, Type, plainToInstance } from 'class-transformer';
import { MessageEntity } from './message.entity';
import { GroupMemberEntity } from './group-member.entity';

export class GroupConversationEntity implements GroupConversation {
  @Expose()
  isGroup: boolean;

  @Expose()
  isDirect: boolean;

  @Expose()
  avatar: string;

  @Expose()
  id: number;

  @Expose()
  title: string;
  
  @Expose()
  password: string | null;
  
  @Expose()
  type: groupType;

  @Expose()
  @Type(() => MessageEntity)
  messages?: MessageEntity[];

  @Expose()
  @Type(() => GroupMemberEntity)
  members?: GroupMemberEntity[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromGroupConversation(
    GroupConversation: GroupConversation,
  ): GroupConversationEntity;
  static fromGroupConversation(
    GroupConversation: GroupConversation[],
  ): GroupConversationEntity[];
  static fromGroupConversation(
    groupconversation: GroupConversation | GroupConversation[],
  ): GroupConversationEntity | GroupConversationEntity[] {
    return plainToInstance(GroupConversationEntity, groupconversation, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
