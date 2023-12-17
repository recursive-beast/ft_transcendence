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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { sortBy } from 'lodash';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { GroupCreateDTO } from './dto/group-create.dto';
import { GroupService } from './group.service';

@Controller('chat/group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  async index(@CurrentUser() { id }: UserEntity) {
    const conversations = await this.groupService.findManyChannels(id);

    const sorted = sortBy(conversations, (conversation) => {
      const messages = conversation.messages;
      if (messages?.length) return messages?.at(-1)?.createdAt;
      return conversation.createdAt;
    });

    return sorted.reverse();
  }

  @Post()
  async create(@CurrentUser() user: UserEntity, @Body() dto: GroupCreateDTO) {
    const group = await this.groupService.createChannel(
      user.id,
      dto.title,
      dto.type,
      dto.members,
      dto.password,
    );

    const members = group.members || [];

    setTimeout(() => {
      for (const member of members) {
        if (member.user.id === user.id) continue;
        this.eventEmitter.emit('chat.group.add', user, member.user, group);
      }
    }, 1000);

    return group;
  }

  @Post('join')
  async join(
    @CurrentUser() user: UserEntity,
    @Body() data: { channelTitle: string; password?: string },
  ) {
    const conversation = await this.groupService.joinChannel(
      user.id,
      data.channelTitle,
      data.password,
    );

    this.eventEmitter.emit('channel.join', conversation.id);

    return conversation;
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post(':id')
  async avatar(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.groupService.setChannelAvatar(id, file);
  }

  @Get(':id')
  getById(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.groupService.findChannel(user.id, id);
  }
}
