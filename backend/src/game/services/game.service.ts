import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GaneService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async recordGameResult(
    gameid: number,
    player1: any,
    player2: any,
    isWin: boolean,
    prismaService: PrismaService,
  ) {
    if (isWin) {
      await prismaService.win.create({
        data: {
          user: { connect: { id: player1.id } },
          gameId: gameid,
          opponentId: player2.id,
          userscore: player1.score,
          opponentscore: player2.score,
        },
      });

      await prismaService.loss.create({
        data: {
          user: { connect: { id: player2.id } },
          gameId: gameid,
          opponentId: player1.id,
          userscore: player2.score,
          opponentscore: player1.score,
        },
      });
    } else {
      await prismaService.win.create({
        data: {
          user: { connect: { id: player2.id } },
          gameId: gameid,
          opponentId: player1.id,
          userscore: player2.score,
          opponentscore: player1.score,
        },
      });

      await prismaService.loss.create({
        data: {
          user: { connect: { id: player1.id } },
          gameId: gameid,
          opponentId: player2.id,
          userscore: player1.score,
          opponentscore: player2.score,
        },
      });

    }
  }

  async checkAchievement(opponent: any, player: any) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id:  player.id,
      },
    });
    const wins = await this.prismaService.win.findMany({
      where: {
        user: { id: player.id },
      },
    });
    const losses = await this.prismaService.loss.findMany({
      where: {
        user: { id: player.id },
      },
    });
    const other = await this.prismaService.user.findFirst({
      where: {
        id: opponent.id,
        friends: {
          some: {
            id: player.id,
          },
        },
      },
    });

    if(player.maxspeed === true && user?.SpeedRacer === false){
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          SpeedRacer: true,
        },
      });
      this.eventEmitter.emit('achivement.unlocked', player.id, 'Speed Racer');
    }
    if (other && user?.FriendlyMatch === false) {
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          FriendlyMatch: true,
        },
      });
      await this.prismaService.user.update({
        where: {
          id: other.id,
        },
        data: {
          FriendlyMatch: true,
        },
      });


      this.eventEmitter.emit('achivement.unlocked', player.id, 'Friendly Match');
      this.eventEmitter.emit('achivement.unlocked', opponent.id, 'Friendly Match');
    }

    if (wins.length != 0 && (wins[wins.length - 1].opponentscore === 0 && user?.PerfectDefense === false)) {
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          PerfectDefense: true,
        },
      });

      this.eventEmitter.emit('achivement.unlocked', player.id, 'Perfect Defense');
    }
    if ((wins[0] || losses[0]) && user?.PongNovice === false) {
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          PongNovice: true,
        },
      });

      this.eventEmitter.emit('achivement.unlocked', player.id, 'Pong Novice');
    }
    if (wins.length >= 10 && user?.PongMaster === false) {
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          PongMaster: true,
        },
      });

      this.eventEmitter.emit('achivement.unlocked', player.id, 'Pong Master');
    }
    if (wins[0] && user?.FirstVictory === false) {
      await this.prismaService.user.update({
        where: {
          id: player.id,
        },
        data: {
          FirstVictory: true,
          RookiePaddler: true,
        },
      });

      this.eventEmitter.emit('achivement.unlocked', player.id, 'First Victory');
      this.eventEmitter.emit(
        'achivement.unlocked',
        player.id,
        'Rookie Paddler',
      );
    }
  }
}
