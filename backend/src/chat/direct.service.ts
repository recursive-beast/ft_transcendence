import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MessageEntity } from 'src/common/entities/message.entity';
import { DirectMessageDTO } from './dto/direct-message.dto';
import { DirectConversationEntity } from 'src/common/entities/direct-conversation.entity';

@Injectable()
export class DirectService {
  constructor(private prismaService: PrismaService) {}

  async sendMessage(senderId: number, dto: DirectMessageDTO) {
    let conversation = await this.prismaService.directConversation.findFirst({
      where: {
        members: {
          every: {
            OR: [{ id: senderId }, { id: dto.recieverId }],
          },
        },
      },
    });

    if (!conversation) {
      conversation = await this.prismaService.directConversation.create({
        data: {
          members: {
            connect: [{ id: senderId }, { id: dto.recieverId }],
          },
        },
      });
    }

    const message = await this.prismaService.message.create({
      data: {
        sender: { connect: { id: senderId } },
        text: dto.text,
        directConversation: { connect: { id: conversation.id } },
      },
      include: { directConversation: true },
    });

    return MessageEntity.fromMessage(message);
  }

  async findConversation(userId: number, conversationId: number) {
    const conversation =
      await this.prismaService.directConversation.findUniqueOrThrow({
        where: {
          id: conversationId,
          members: {
            some: { id: userId },
          },
        },
        include: {
          messages: true,
          members: true,
        },
      });

    return DirectConversationEntity.fromDirectConversation(conversation);
  }

  async findManyConversations(userId: number) {
    const conversations = await this.prismaService.directConversation.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        messages: true,
        members: true
      },
    });

    return DirectConversationEntity.fromDirectConversation(conversations);
  }
}
