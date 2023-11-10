import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';

@Controller('chat/group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  index(@CurrentUser() user: UserEntity) {
    return this.groupService.findManyChannels(user.id);
  }

  @Get(':id')
  getById(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.groupService.findChannel(user.id, id);
  }
}
