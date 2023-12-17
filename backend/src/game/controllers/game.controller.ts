import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';

@Controller('game')
export class GameController {
  constructor(private prismaService: PrismaService) {}

  @Get('history/:id')
  async matches(@Param('id', ParseIntPipe) id: number) {
    const wins = await this.prismaService.win.findMany({
      where: { user: { id } },
    });
    const losses = await this.prismaService.loss.findMany({
      where: { user: { id } },
    });
    const matches = [...wins, ...losses];

    matches.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return matches;
  }

  @Get('leaderboard')
  async leaderboard() {
    const users = await this.prismaService.user.findMany({
      include: {
        wins: true,
        losses: true,
      },
    });

    users.sort((a, b) => b.wins.length - a.wins.length);

    const leaderboard = users.map((user) => {
      const gamesPlayed = user.wins.length + user.losses.length;
      const winRatio = (user.wins.length / gamesPlayed) * 100 || 0;
      const lossRatio = (user.losses.length / gamesPlayed) * 100 || 0;
      return {
        user,
        gamesPlayed,
        winRatio,
        lossRatio,
      };
    });



    return leaderboard;
  }
  @Get('home/leaderboard')
  async homeleaderboard(@Param('id', ParseIntPipe) id: number){
    const users = await this.prismaService.user.findMany({
      include: {
        wins: true,
        losses: true,
      },
    });

    users.sort((a, b) => b.wins.length - a.wins.length);

    const leaderboard = users.map((user) => {
      const gamesPlayed = user.wins.length + user.losses.length;
      const winRatio = (user.wins.length / gamesPlayed) * 100 || 0;
      return {
        user,
        gamesPlayed,
        winRatio,
      };
    });



    return leaderboard;
  }
}

