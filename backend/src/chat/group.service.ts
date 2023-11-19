import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MessageEntity } from 'src/common/entities/message.entity';
import { GroupMessageDTO } from './dto/group-message.dto';
import { GroupConversationEntity } from 'src/common/entities/group-conversation.entity';
import { GroupMemberEntity } from 'src/common/entities/group-member.entity';
import { roleType } from '@prisma/client';
import { now } from 'lodash';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}

  async sendMessage(senderId: number, dto: GroupMessageDTO) {
    const message = await this.prismaService.message.create({
      data: {
        sender: { connect: { id: senderId } },
        text: dto.text,
        groupConversation: { connect: { id: dto.groupConversationId } },
      },
      include: { groupConversation: true },
    });

    return MessageEntity.fromMessage(message);
  }

  async findMember(channelId: number, userId: number) {
    const member = await this.prismaService.groupMember.findFirstOrThrow({
      where: {
        userId: userId,
        groupConversationId: channelId,
      },
    });

    return GroupMemberEntity.fromGroupMember(member);
  }

  async banSomeone(admineId: number, toBanId: number, channelId: number) {
    const admin = await this.findMember(channelId, admineId);
    const toBan = await this.findMember(channelId, toBanId);

    if (admin && toBan) {
      if (admin.role === roleType.OWNER) {
        await this.prismaService.groupConversation.update({
          where: { id: channelId },
          data: {
            banned: { connect: { id: toBan.id } },
          },
        });
        await this.prismaService.groupMember.delete({
          where: { id: toBan.id },
        });
      } else if (
        admin.role === roleType.ADMIN &&
        toBan.role === roleType.MEMBER
      ) {
        await this.prismaService.groupConversation.update({
          where: { id: channelId },
          data: {
            banned: { connect: { id: toBan.id } },
          },
        });
        await this.prismaService.groupMember.delete({
          where: { id: toBan.id },
        });
      } else {
        throw new BadRequestException('Invalid permissions');
      }
    }
  }

  async unbanSomeone(admineId: number, toUnbanId: number, channelId: number) {
    const admin = await this.findMember(channelId, admineId);
    const toUnban = await this.prismaService.user.findFirstOrThrow({
      where: { id: toUnbanId },
    });
    if (admin && toUnban) {
      if (admin.role === roleType.OWNER || admin.role === roleType.ADMIN) {
        await this.prismaService.user.update({
          where: { id: toUnbanId },
          data: { bannedFromGroups: { disconnect: { id: channelId } } },
        });
      }
      else {
        throw new BadRequestException('Invalid permissions');
      }
    }
  }

  async kickSomeone(admineId: number, toKickId: number, channelId: number) {
    const admin = await this.findMember(channelId, admineId);
    const toKick = await this.findMember(channelId, toKickId);

    if (admin && toKick) {
      if (admin.role === roleType.OWNER) {
        await this.prismaService.groupMember.delete({
          where: { id: toKick.id },
        });
      } else if (admin.role === roleType.ADMIN) {
        await this.prismaService.groupMember.delete({
          where: {
            role: roleType.MEMBER,
            id: toKick.id,
          },
        });
      } else {
        throw new BadRequestException('Invalid permissions');
      }
    }
  }

  async muteSomeone(admineId: number, toMuteId: number, channelId: number) {
    const admin = await this.findMember(channelId, admineId);
    const toMute = await this.findMember(channelId, toMuteId);
    const fifteenMinutesFromNow = new Date();
    fifteenMinutesFromNow.setMinutes(fifteenMinutesFromNow.getMinutes() + 15);

    if (admin && toMute) {
      if (admin.role === roleType.OWNER) {
        await this.prismaService.groupMember.update({
          where: { id: toMute.id },
          data: { mutedUntil: fifteenMinutesFromNow },
        });
      } else if (
        admin.role === roleType.ADMIN &&
        toMute.role === roleType.MEMBER
      ) {
        await this.prismaService.groupMember.update({
          where: { id: toMute.id },
          data: { mutedUntil: fifteenMinutesFromNow },
        });
      } else {
        throw new BadRequestException('Invalid permissions');
      }
    }
  }

  async findManyChannels(userId: number) {
    const channels = await this.prismaService.groupConversation.findMany({
      where: {
        members: {
          some: { userId: userId },
        },
      },
      include: {
        messages: true,
        members: true,
      },
    });
    return GroupConversationEntity.fromGroupConversation(channels);
  }

  async findChannel(userId: number, channelId: number) {
    const channel =
      await this.prismaService.groupConversation.findUniqueOrThrow({
        where: {
          id: channelId,
          members: {
            some: { userId: userId },
          },
        },
        include: {
          messages: true,
          members: true,
        },
      });
    return GroupConversationEntity.fromGroupConversation(channel);
  }
}
