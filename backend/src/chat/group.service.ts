import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MessageEntity } from 'src/common/entities/message.entity';
import { GroupMessageDTO } from './dto/group-message.dto';
import { GroupConversationEntity } from 'src/common/entities/group-conversation.entity';

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
