import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'nestjs-prisma';
import os from 'os';
import { CommonModule } from 'src/common/common.module';
import { BlockedController } from './blocked.controller';
import { BlockedService } from './blocked.service';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';
import { UserInterceptor } from './user.interceptor';
import { UserService } from './user.service';

@Module({
  imports: [
    MulterModule.register({ dest: os.tmpdir() }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    CommonModule,
  ],
  providers: [
    UserService,
    FriendService,
    BlockedService,
    UserGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  controllers: [FriendController, BlockedController, UserController],
  exports: [UserService, FriendService, BlockedService],
})
export class UserModule {}
