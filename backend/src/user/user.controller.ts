import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ClassTransformerGroups } from 'src/common/enum';
import { UserEntity } from '../common/entities/user.entity';
import { UserUpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async index() {
    return this.userService.findMany();
  }

  @SerializeOptions({ groups: [ClassTransformerGroups.GROUP_ME] })
  @Get('me')
  async getMe(@CurrentUser() user: UserEntity) {
    return user;
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('me/avatar')
  async avatar(
    @CurrentUser() user: UserEntity,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
  ) {
    return this.userService.setAvatar(user.id, file);
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: UserEntity, @Body() body: UserUpdateDTO) {
    return this.userService.update(user.id, body);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByIdOrThrow(id);
  }
}
