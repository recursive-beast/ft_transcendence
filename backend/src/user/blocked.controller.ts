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
import { UserEntity } from '../common/entities/user.entity';
import { BlockedService } from './blocked.service';
import { UserQueryDTO } from './dto/query.dto';

@Controller('users/blocked')
export class BlockedController {
  constructor(private blockedService: BlockedService) {}

  @Get()
  async index(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    return this.blockedService.findMany(user.id, query);
  }

  @Put(':id')
  async block(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.blockedService.block(user.id, id) };
  }

  @Delete(':id')
  async unblock(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.blockedService.unblock(user.id, id) };
  }
}
