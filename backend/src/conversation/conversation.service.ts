import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ConversationDTO } from './dto/conversation.dto';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class ConversationService {
    constructor(private prismaService: PrismaService) { }

    async findOne(id: number) {
        return this.prismaService.conversation.findUniqueOrThrow({ where: { id } });
    }

    async createOne(newCon: ConversationDTO, user: UserEntity) {
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
}
