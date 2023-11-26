import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { GroupCreateDTO } from './dto/group-create.dto';
import { GroupService } from './group.service';

@Controller('chat/group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  index(@CurrentUser() user: UserEntity) {
    return this.groupService.findManyChannels(user.id);
  }

  @Post()
  async create(@CurrentUser() user: UserEntity, @Body() dto: GroupCreateDTO) {
    return {
      data: await this.groupService.createChannel(
        user.id,
        dto.title,
        dto.type,
        dto.members,
        dto.password,
      ),
    };
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post(':id')
  async avatar(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      data: await this.groupService.setChannelAvatar(id, file),
    };
  }

  @Get(':id')
  getById(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.groupService.findChannel(user.id, id);
  }
}
