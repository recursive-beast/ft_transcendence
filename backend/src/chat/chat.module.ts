import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'nestjs-prisma';
import os from 'os';
import { CommonModule } from 'src/common/common.module';
import { DirectController } from './direct.controller';
import { DirectGateway } from './direct.gateway';
import { DirectService } from './direct.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [DirectController, GroupController],
  imports: [
    MulterModule.register({ dest: os.tmpdir() }),
    PrismaModule,
    CommonModule,
  ],
  providers: [DirectService, DirectGateway, GroupService],
})
export class ChatModule {}
