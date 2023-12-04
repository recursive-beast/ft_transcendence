import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { BlockedService } from './blocked.service';

@Controller('users/blocked')
export class BlockedController {
  constructor(private blockedService: BlockedService) {}

  @Get()
  async index(@CurrentUser() user: UserEntity) {
    return this.blockedService.findMany(user.id);
  }

  @Put(':id')
  async block(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.blockedService.block(user.id, id);
  }

  @Delete(':id')
  async unblock(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.blockedService.unblock(user.id, id);
  }
}
