import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ClassTransformerGroups } from 'src/common/enum';
import { UserEntity } from '../common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { UserUpdateDTO } from './dto/update.dto';
import { UserDTOFactory } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userDTOFactory: UserDTOFactory,
  ) {}

  @Get()
  async index(@Query() query: UserQueryDTO, @CurrentUser() user: UserEntity) {
    const { data, meta } = await this.userService.findMany(query);

    return {
      meta,
      data: await this.userDTOFactory.fromUser(data, user.id),
    };
  }

  @SerializeOptions({ groups: [ClassTransformerGroups.GROUP_ME] })
  @Get('me')
  async getMe(@CurrentUser() user: UserEntity) {
    return { data: user };
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Put('me/avatar')
  async avatar(
    @CurrentUser() user: UserEntity,
    @UploadedFile(ParseFilePipe)
    file: Express.Multer.File,
  ) {
    return { data: await this.userService.setAvatar(user.id, file.path) };
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: UserEntity, @Body() body: UserUpdateDTO) {
    return { data: await this.userService.update(user.id, body) };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    const entity = await this.userService.findByIdOrThrow(id);

    return { data: await this.userDTOFactory.fromUser(entity, user.id) };
  }
}
