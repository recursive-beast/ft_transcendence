import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JWTOTPGuard } from 'src/auth/guards/jwt-otp.guard';

@UseGuards(JWTOTPGuard)
@Controller('user')
export class UserController {
  @Get('me')
  async me(@Req() req) {
    return req.user;
  }
}
