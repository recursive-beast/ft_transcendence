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
import { BlockedService } from './blocked.service';
import { UserQueryDTO } from './dto/query.dto';
import { UserDTOFactory } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users/blocked')
export class BlockedController {
  constructor(private blockedService: BlockedService, private userDTOFactory: UserDTOFactory) {}

  @Get()
  async index(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    const { data, meta } = await this.blockedService.findMany(user.id, query);

    return {
      meta,
      data: await this.userDTOFactory.fromUser(data, user.id),
    };
  }

  @Put(':id')
  async block(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    const entity = await this.blockedService.block(user.id, id);

    return { data: await this.userDTOFactory.fromUser(entity, user.id) };
  }

  @Delete(':id')
  async unblock(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    const entity = await this.blockedService.unblock(user.id, id);

    return { data: await this.userDTOFactory.fromUser(entity, user.id) };
  }
}
