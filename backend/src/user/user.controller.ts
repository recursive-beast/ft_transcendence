import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam, ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { OTPGuard } from 'src/auth/guards/otp.guard';
import { ImageFileValidator } from 'src/image.validator';
import { GROUP_ME } from 'src/serialize-groups';
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
    description: 'Returns the current authenticated user',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  @SerializeOptions({ groups: [GROUP_ME] })
  @Get('me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @ApiOkResponse({ description: 'The user record for the specified ID.' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    type: 'integer',
    example: 1,
  })
  @ApiOperation({ summary: 'Get a user by ID' })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByIdOrThrow(id);
  }

  @ApiOperation({
    summary: 'Update the current user',
    description:
      'This endpoint updates the current user with the provided data. If an image file is provided, it is resized to 300x300 pixels.',
  })
  @ApiOkResponse({ description: 'Returns the updated user' })
  @ApiConflictResponse({ description: 'Conflict: Display name is not unique' })
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

    return await this.userService.update(user.id, body);
  }
}
