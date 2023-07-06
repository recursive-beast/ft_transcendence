import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { OTPGuard } from 'src/auth/guards/otp.guard';
import { UserEntity } from './user.entity';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(JWTGuard, OTPGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  @ApiOkResponse({
    description: 'Returns the current authenticated user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or expired token',
  })
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  @Get('me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }
}
