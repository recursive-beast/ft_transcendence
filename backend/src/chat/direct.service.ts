import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MessageEntity } from 'src/common/entities/message.entity';
import { DirectMessageDTO } from './dto/direct-message.dto';
import { DirectConversationEntity } from 'src/common/entities/direct-conversation.entity';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class DirectService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: number) {
    const user = this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        blocked: true,
        blockedBy: true,
      },
    });

    return user;
  }

  async checkBlock(userId: number, recieverId: number) {
    const sender = await this.getUser(userId);

    if (sender) {
      const blockedUsers = sender.blocked;
      const blockedByUsers = sender.blockedBy;
      const foundBlocked = blockedUsers.find((user) => {
        return user.id === recieverId;
      });
      const foundBlockedBy = blockedByUsers.find((user) => {
        return user.id === recieverId;
      });
      if (foundBlocked || foundBlockedBy) throw new BadRequestException();
      else return null;
    } else {
      throw new BadRequestException();
    }
  }

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
    if (senderId === dto.recieverId) throw new BadRequestException();
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

  async seenMessage(userId: number, dmId: number) {
    const dm = await this.findConversation(userId, dmId);

    if (dm) {
      await this.prismaService.message.updateMany({
        where: {
          senderId: { not: userId },
          directConversationId: dmId,
        },
        data: { seen: true },
      });
    }
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
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
            include: {
              sender: true,
            },
          },
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
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        members: true,
      },
    });

    return DirectConversationEntity.fromDirectConversation(conversations);
  }
}
