import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GameGateway } from './game.gateway';
import { GameController } from './controllers/game.controller';
import { GaneService } from './services/game.service';

@Module({
  imports: [PrismaModule],
  providers: [GameGateway, GaneService],
  controllers: [GameController],
})
export class GameModule {}
