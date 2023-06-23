import { Controller, Get, Req } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('me')
  async me(@Req() req) {
    return req.user;
  }
}
