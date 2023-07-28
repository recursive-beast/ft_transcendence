import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserQueryDTO } from './dto/query.dto';
import { UserDTOFactory } from './dto/user.dto';
import { UserEntity } from '../common/entities/user.entity';
import { FriendService } from './friend.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('users/friends')
export class FriendController {
  constructor(
    private friendService: FriendService,
    private userDTOFactory: UserDTOFactory,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  async index(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    const { data, meta } = await this.friendService.findMany(user.id, query);

    return {
      meta,
      data: await this.userDTOFactory.fromUser(data, user.id),
    };
  }

  @Get('mutual/:id')
  async mutual(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
    @Query() query: UserQueryDTO,
  ) {
    const { data, meta } = await this.friendService.findManyMutual(
      user.id,
      id,
      query,
    );

    return {
      meta,
      data: await this.userDTOFactory.fromUser(data, user.id),
    };
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

    return { data: await this.userDTOFactory.fromUser(entity, user.id) };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    const entity = await this.friendService.delete(user.id, id);

    return { data: await this.userDTOFactory.fromUser(entity, user.id) };
  }
}
