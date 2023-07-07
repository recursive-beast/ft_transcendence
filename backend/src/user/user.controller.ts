import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { OTPGuard } from 'src/auth/guards/otp.guard';
import { ImageFileValidator } from 'src/image.validator';
import { URL } from 'url';
import { UpdateUserDTO } from './update.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(JWTGuard, OTPGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  @ApiOkResponse({
    description: 'Returns the current authenticated user profile',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiOperation({ summary: 'Get the currently authenticated user profile' })
  @Get('me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @ApiOperation({
    summary: 'Update the current user profile',
    description:
      'This endpoint updates the current user profile with the provided data. If an image file is provided, it is resized to 300x300 pixels.',
  })
  @ApiOkResponse({
    description: 'Returns the updated user profile',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiBadRequestResponse({
    description: 'Bad request due to invalid request body',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch('me/update')
  async update(
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateUserDTO,
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
    const filename = Date.now() + '.png';
    const output_path = path.join('public/images', filename);
    let image_url: string | null = null;

    if (file) {
      await fs.mkdir('public/images', { recursive: true });
      await sharp(file.buffer).resize(300, 300).toFile(output_path);

      image_url = new URL(
        `/static/images/${filename}`,
        this.configService.get('APP_URL'),
      ).href;
    }

    if (image_url) body.image = image_url;

    return await this.userService.update(user.id, body);
  }
}
