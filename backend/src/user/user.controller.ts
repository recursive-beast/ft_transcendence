import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { OTPGuard } from 'src/auth/guards/otp.guard';
import { TransformInterceptor } from 'src/transform.interceptor';
import { UserEntity } from './user.entity';

@UseInterceptors(new TransformInterceptor(UserEntity))
@UseGuards(JWTGuard, OTPGuard)
@Controller('user')
export class UserController {
  @Get('me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
