import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { FriendService } from './friend.service';

@Controller('users/friends')
export class FriendController {
  constructor(
    private friendService: FriendService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  async index(@CurrentUser() user: UserEntity) {
    return this.friendService.findMany(user.id);
  }

  @Get('mutual/:id')
  async mutual(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.friendService.findManyMutual(user.id, id);
  }

  @Put(':id')
  async add(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    let entity = await this.friendService.findById(user.id, id);

    if (!entity) {
      entity = await this.friendService.add(user.id, id);
      this.eventEmitter.emit('user.friend.add', user, entity);
    }

    return entity;
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.friendService.delete(user.id, id);
  }
}
