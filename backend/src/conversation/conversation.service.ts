import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ConversationDTO } from './dto/conversation.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { MessageDTO } from './dto/message.dto';
import { ConversationEntity } from 'src/common/entities/conversation.entity';

@Injectable()
export class ConversationService {
    constructor(private prismaService: PrismaService) { }

    async findOne(id: number) {
        return this.prismaService.conversation.findUniqueOrThrow({ where: { id } });
    }

    async getAll() {
        return this.prismaService.conversation.findMany();
    }

    async getMessages(id: number) {
        return this.prismaService.conversation.findUniqueOrThrow(
            {
                where: {id: id,},
                include: {
                    messages: true,
                },
            }, 
        )
    }

    async createOne(newCon: ConversationDTO, user: UserEntity) {
        if (!newCon.isGroup && newCon.members.length != 2) {
            throw new BadRequestException("Private conversation can only contain two members");
        }

        const conversation = await this.prismaService.conversation.create({
            data: {
                adminId: user.id,
                isGroup: newCon.isGroup,
                members: {
                    connect: newCon.members.map((id) => ({ id }))
                }
            }
        });
        // 
        return ConversationEntity.fromConversation(conversation);
    }

    async sendMes(user: UserEntity, newMsg: MessageDTO, id: number) {
        await this.findOne(id);

        return this.prismaService.message.create({
            data: {
                senderId: user.id,
                text: newMsg.text,
                conversationId: id,
            }
        })
    }

    async updateTitle(userId: number, title: string, id: number) {
        const convToChange = await this.findOne(id);
        if (!convToChange.isGroup || convToChange.adminId != userId || title.length == 0)
            throw new BadRequestException("unvalid");
        return this.prismaService.conversation.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
    }
}
