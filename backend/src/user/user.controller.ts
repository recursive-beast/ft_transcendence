import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Query,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ClassTransformerGroups } from 'src/common/enum';
import { ImageFileValidator } from 'src/common/image.validator';
import { URL } from 'url';
import { UserEntity } from '../common/entities/user.entity';
import { UserQueryDTO } from './dto/query.dto';
import { UserUpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  @Get()
  async index(@Query() query: UserQueryDTO) {
    return this.userService.findMany(query);
  }

  @SerializeOptions({ groups: [ClassTransformerGroups.GROUP_ME] })
  @Get('me')
  async getMe(@CurrentUser() user: UserEntity) {
    return { data: user };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch('me')
  async updateMe(
    @CurrentUser() user: UserEntity,
    @Body() body: UserUpdateDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5 MB
          new ImageFileValidator({ formats: ['png', 'jpeg', 'jpg'] }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) {
      const filename = Date.now() + '.png';
      const output_path = path.join('public/images', filename);

      await fs.mkdir('public/images', { recursive: true });
      await sharp(file.buffer).resize(300, 300).toFile(output_path);

      body.image = new URL(
        `/static/images/${filename}`,
        this.configService.get('APP_URL'),
      ).href;
    }

    return { data: await this.userService.update(user.id, body) };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return { data: await this.userService.findByIdOrThrow(id) };
  }
}
