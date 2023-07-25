import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { BlockedController } from './blocked.controller';
import { BlockedService } from './blocked.service';
import { UserDTOFactory } from './dto/user.dto';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    FriendService,
    BlockedService,
    UserDTOFactory,
    UserGateway,
  ],
  controllers: [FriendController, BlockedController, UserController],
  exports: [UserService, FriendService, BlockedService],
})
export class UserModule {}
