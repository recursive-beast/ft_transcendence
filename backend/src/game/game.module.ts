import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GameGateway } from './game.gateway';

@Module({
  imports: [PrismaModule],
  providers: [GameGateway],
})
export class GameModule {}
