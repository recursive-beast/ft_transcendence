import { Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async me(@Req() req) {
    return this.userService.findByIdOrThrow(req.user.id);
  }
}
