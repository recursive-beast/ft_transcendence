import { GroupMember, roleType } from '@prisma/client';
import { Exclude, Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { GroupConversationEntity } from './group-conversation.entity';
import { UserEntity } from './user.entity';

export class GroupMemberEntity implements GroupMember {

  @Expose()
  seenAt: Date;
  
  @Expose()
  id: number;
  
  @Exclude()
  groupConversationId: number;

  @Expose()
  @Type(() => GroupConversationEntity)
  groupConversation: GroupConversationEntity;
  
  @Exclude()
  userId: number;

  @Expose()
  @Type(() => UserEntity)
  user: UserEntity;

  @Expose()
  role: roleType;

  @Expose()
  isBanned: boolean;
  
  @Expose()
  @Transform(({value}) => value || new Date(0))
  mutedUntil: Date;
  
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromGroupMember(
    GroupMember: GroupMember,
  ): GroupMemberEntity;
  static fromGroupMember(
    GroupMember: GroupMember[],
  ): GroupMemberEntity[];
  static fromGroupMember(
    groupmember: GroupMember | GroupMember[],
  ): GroupMemberEntity | GroupMemberEntity[] {
    return plainToInstance(GroupMemberEntity, groupmember, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });
  }
}
