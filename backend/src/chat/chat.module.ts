import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { DirectController } from './direct.controller';
import { DirectGateway } from './direct.gateway';
import { DirectService } from './direct.service';

@Module({
  controllers: [DirectController],
  imports: [PrismaModule],
  providers: [DirectService, DirectGateway],
})
export class ChatModule {}
