import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { DirectController } from './direct.controller';
import { DirectGateway } from './direct.gateway';
import { DirectService } from './direct.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [DirectController, GroupController],
  imports: [PrismaModule],
  providers: [DirectService, DirectGateway, GroupService],
})
export class ChatModule {}
