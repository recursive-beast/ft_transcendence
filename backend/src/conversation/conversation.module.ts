import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [ConversationController],
  imports: [PrismaModule],
  providers: [ConversationService]
})
export class ConversationModule {}
