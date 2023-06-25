import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTOTPGuard } from 'src/auth/guards/jwt-otp.guard';

@UseGuards(JWTOTPGuard)
@Controller('user')
export class UserController {
  @Get('me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
