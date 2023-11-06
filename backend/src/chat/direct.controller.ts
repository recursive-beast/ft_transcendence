import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { DirectService } from './direct.service';

@Controller('chat/direct')
export class DirectController {
  constructor(private directService: DirectService) {}

  @Get()
  index(@CurrentUser() user: UserEntity) {
    return this.directService.findManyConversations(user.id);
  }

  @Get(':id')
  getById(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.directService.findConversation(user.id, id);
  }
}
