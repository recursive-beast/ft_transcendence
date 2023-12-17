import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { sortBy } from 'lodash';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { DirectService } from './direct.service';

@Controller('chat/direct')
export class DirectController {
  constructor(private directService: DirectService) {}

  @Get()
  async index(@CurrentUser() { id }: UserEntity) {
    const conversations = await this.directService.findManyConversations(id);

    const sorted = sortBy(conversations, (conversation) => {
      const messages = conversation.messages;
      if (messages?.length) return messages?.at(-1)?.createdAt;
      return conversation.createdAt;
    });

    return sorted.reverse();
  }

  @Get(':id')
  getById(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.directService.findConversation(user.id, id);
  }
}
