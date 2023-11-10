import { GroupMember, roleType } from '@prisma/client';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';

export class GroupMemberEntity implements GroupMember {
  @Expose()
  groupConversationId: number;

  @Expose()
  id: number;

  @Expose()
  userId: number;

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
