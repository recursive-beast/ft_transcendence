import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ConversationService {
    constructor(private prismaService: PrismaService) {}
    
    async findOne(id: number) {
        return this.prismaService.conversation.findUniqueOrThrow({ where: {id}});
    }
}
