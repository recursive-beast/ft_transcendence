import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ConversationDTO } from './dto/conversation.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { MessageDTO } from './dto/message.dto';

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

        return this.prismaService.conversation.create({
            data: {
                adminId: user.id,
                isGroup: newCon.isGroup,
                members: {
                    connect: newCon.members.map((id) => ({ id }))
                }
            }
        });
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
}
