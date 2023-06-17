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
import { BlockedService } from './blocked.service';
import { UserQueryDTO } from './dto/query.dto';

@Controller('users/blocked')
export class BlockedController {
  constructor(private blockedService: BlockedService) {}

  @Get()
  async blocked(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    return this.blockedService.findMany(user.id, query);
  }

  @Put('blocked/:id')
  async block(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.blockedService.block(user.id, id) };
  }

  @Delete('blocked/:id')
  async unblock(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return { data: await this.blockedService.unblock(user.id, id) };
  }
}
