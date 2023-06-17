import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { BlockedController } from './blocked.controller';
import { BlockedService } from './blocked.service';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, FriendService, BlockedService],
  controllers: [FriendController, BlockedController, UserController],
  exports: [UserService, FriendService, BlockedService],
})
export class UserModule {}
