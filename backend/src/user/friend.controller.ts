import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { FriendService } from './friend.service';

@Controller('users/friends')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get()
  async index(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    return this.friendService.findMany(user.id, query);
  }

  @Get('mutual/:id')
  async mutual(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
    @Query() query: UserQueryDTO,
  ) {
    return this.friendService.findManyMutual(user.id, id, query);
  }

  @Put(':id')
  async add(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.friendService.add(user.id, id) };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.friendService.delete(user.id, id) };
  }
}
