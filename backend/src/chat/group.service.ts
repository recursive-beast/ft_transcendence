import { BadRequestException, Injectable } from '@nestjs/common';
import { groupType, roleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { CommonService } from 'src/common/common.service';
import { GroupConversationEntity } from 'src/common/entities/group-conversation.entity';
import { GroupMemberEntity } from 'src/common/entities/group-member.entity';
import { MessageEntity } from 'src/common/entities/message.entity';
import { GroupMessageDTO } from './dto/group-message.dto';
import { GroupUpdateDTO } from './dto/group-update.dto';

@Injectable()
export class GroupService {
  constructor(
    private prismaService: PrismaService,
    private commonService: CommonService,
  ) {}

  async sendMessage(senderId: number, dto: GroupMessageDTO) {
    const member = await this.findMember(dto.groupConversationId, senderId);
    if (member) {
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

  hasMuteExpired(muteUntil: Date) {
    const currentDate = new Date();
    return currentDate > muteUntil;
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
        if (admin.mutedUntil && !this.hasMuteExpired(admin.mutedUntil))
          throw new BadRequestException();
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
        if (
          admin.role === roleType.ADMIN &&
          admin.mutedUntil &&
          !this.hasMuteExpired(admin.mutedUntil)
        )
          throw new BadRequestException();
        await this.prismaService.user.update({
          where: { id: toUnbanId },
          data: { bannedFromGroups: { disconnect: { id: channelId } } },
        });
      } else {
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
        if (admin.mutedUntil && !this.hasMuteExpired(admin.mutedUntil))
          throw new BadRequestException();
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
        if (admin.mutedUntil && !this.hasMuteExpired(admin.mutedUntil))
          throw new BadRequestException();
        await this.prismaService.groupMember.update({
          where: { id: toMute.id },
          data: { mutedUntil: fifteenMinutesFromNow },
        });
      } else {
        throw new BadRequestException('Invalid permissions');
      }
    }
  }

  async addNewMembers(admineId: number, channelId: number, members: number[]) {
    const admin = await this.findMember(channelId, admineId);
    if (admin.role === roleType.OWNER || admin.role === roleType.ADMIN) {
      for (let index = 0; index < members.length; index++) {
        const element = members[index];
        const toAdd = await this.prismaService.user.findFirst({
          where: { id: element },
        });
        const isMember = await this.prismaService.groupMember.findFirst({
          where: {
            userId: element,
            groupConversationId: channelId,
          },
        });
        if (!toAdd || isMember) continue;
        await this.prismaService.groupMember.create({
          data: {
            user: { connect: { id: element } },
            groupConversation: { connect: { id: channelId } },
          },
        });
      }
    }
  }

  async leaveChannel(userId: number, channelId: number) {
    const member = await this.findMember(channelId, userId);
    if (member) {
      await this.prismaService.groupMember.delete({
        where: { id: member.id },
      });
    }
  }

  async setChannelAvatar(id: number, file: Express.Multer.File) {
    const url = await this.commonService.saveAvatar(`channel-${id}`, file);
    const updated = await this.prismaService.groupConversation.update({
      where: { id },
      data: { avatar: url },
      include: {
        messages: true,
        members: { include: { user: true } },
      },
    });

    return GroupConversationEntity.fromGroupConversation(updated);
  }

  async createChannel(
    ownerId: number,
    title: string,
    type: groupType,
    members: number[],
    password?: string,
  ) {
    members = [...members, ownerId];
    members = Array.from(new Set(members));

    try {
      if (!password && type === groupType.PROTECTED)
        throw new BadRequestException();
      if (password && type === groupType.PROTECTED)
        password = await bcrypt.hash(password, 10);

      const channel = await this.prismaService.groupConversation.create({
        data: {
          title: title,
          type: type,
          password: password,
          members: {
            createMany: {
              data: members.map((id) => ({
                userId: id,
                role: id === ownerId ? roleType.OWNER : roleType.MEMBER,
              })),
            },
          },
        },
        include: {
          messages: true,
          members: { include: { user: true } },
        },
      });

      return GroupConversationEntity.fromGroupConversation(channel);
    } catch {
      return null;
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
        members: { include: { user: true } },
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
          members: { include: { user: true } },
        },
      });
    return GroupConversationEntity.fromGroupConversation(channel);
  }

  async upgradeMember(userId: number, toUpgradeId: number, channelId: number) {
    const admin = await this.findMember(channelId, userId);
    const toUp = await this.findMember(channelId, toUpgradeId);

    if (admin && toUp) {
      if (admin.role === roleType.ADMIN || admin.role === roleType.OWNER) {
        if (toUp.role === roleType.MEMBER) {
          await this.prismaService.groupMember.update({
            where: { id: toUp.id },
            data: { role: roleType.ADMIN },
          });
        }
      }
    }
  }

  async downgradeMember(
    userId: number,
    toDowngradeId: number,
    channelId: number,
  ) {
    const admin = await this.findMember(channelId, userId);
    const toDown = await this.findMember(channelId, toDowngradeId);

    if (admin && toDown) {
      if (admin.role === roleType.OWNER) {
        if (toDown.role === roleType.ADMIN) {
          await this.prismaService.groupMember.update({
            where: { id: toDown.id },
            data: { role: roleType.MEMBER },
          });
        }
      }
    }
  }

  async joinChannel(userId: number, channelTitle: string, password?: string) {
    const channel = await this.prismaService.groupConversation.findFirstOrThrow(
      {
        where: { title: channelTitle },
      },
    );
    const toAdd = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!toAdd) throw new BadRequestException();
    if (channel.type === groupType.PUBLIC) {
      await this.prismaService.groupMember.create({
        data: {
          user: { connect: { id: userId } },
          groupConversation: { connect: { id: channel.id } },
        },
      });
    } else if (channel.type === groupType.PROTECTED) {
      if (channel.password) {
        if (!password || !(await bcrypt.compare(password, channel.password)))
          throw new BadRequestException();
        const toAdd = await this.prismaService.user.findFirst({
          where: { id: userId },
        });
        await this.prismaService.groupMember.create({
          data: {
            user: { connect: { id: userId } },
            groupConversation: { connect: { id: channel.id } },
          },
        });
      }
    }
  }

  async searchforChannel(channelTitle: string) {
    const channel = await this.prismaService.groupConversation.findFirstOrThrow(
      {
        where: {
          title: channelTitle,
        },
      },
    );

    return GroupConversationEntity.fromGroupConversation(channel);
  }

  async updateChannelTitle(
    userId: number,
    channelId: number,
    newTitle: string,
  ) {
    const member = await this.findMember(channelId, userId);
    if (member.role !== roleType.MEMBER) {
      await this.prismaService.groupConversation.update({
        where: { id: channelId },
        data: { title: newTitle },
      });
    }
  }

  async updateChannelType(userId: number, dto: GroupUpdateDTO) {
    const member = await this.findMember(dto.id, userId);
    const channel = await this.findChannel(userId, dto.id);
    if (channel && member.role !== roleType.MEMBER) {
      if (channel.type !== groupType.PROTECTED) {
        if (dto.type === groupType.PROTECTED) {
          if (dto.newPassword) {
            await this.prismaService.groupConversation.update({
              where: { id: dto.id },
              data: {
                type: dto.type,
                password: await bcrypt.hash(dto.newPassword, 10),
              },
            });
          }
        } else {
          await this.prismaService.groupConversation.update({
            where: { id: dto.id },
            data: { type: dto.type },
          });
        }
      } else {
        if (dto.type != groupType.PROTECTED) {
          await this.prismaService.groupConversation.update({
            where: { id: dto.id },
            data: {
              type: dto.type,
              password: null,
            },
          });
        } else {
          if (
            !dto.currentPassword ||
            !dto.newPassword ||
            (channel.password &&
              !(await bcrypt.compare(dto.currentPassword, channel.password)))
          )
            throw new BadRequestException();
          await this.prismaService.groupConversation.update({
            where: { id: dto.id },
            data: {
              password: await bcrypt.hash(dto.newPassword, 10),
            },
          });
        }
      }
    }
  }
}
