import { ConfigService } from '@nestjs/config';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GatewayMetadataExplorer } from '@nestjs/websockets/gateway-metadata-explorer';
import { omit } from 'lodash';
import { PrismaService } from 'nestjs-prisma';
// import { PrismaModule } from 'nestjs-prisma';
import { Server, Socket } from 'socket.io';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { log } from 'console';

interface Queue {
  id: number;
  socket: Socket;
  mode: string;
}
interface player {
  id?: number;
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
  serve: number;
  direction: 'up' | 'down' | null;
  mode?: string;
  win: false | true;
}

interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  space: number;
  radius: number;
}
interface Game {
  player1: player;
  player2: player;
  ball: Ball;
  id?: number;
  ia: number;
  intervalId?: ReturnType<typeof setInterval>;
  p1ready: false | true;
  p2ready: false | true;
  scoretowin: number;
}
function getRandomIntInclusive(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const ang = getRandomIntInclusive(-0.785398, 0.785398);
const table = {
  height: 700,
  width: 700 * (16 / 9),
};

function collision(ball: Ball, paddle: player) {
  const pTop = paddle.y;
  const pbottom = paddle.y + paddle.height;
  const pleft = paddle.x;
  const pright = paddle.x + paddle.width;
  const ballTop = ball.y - ball.radius;
  const ballbottom = ball.y + ball.radius;
  const ballleft = ball.x - ball.radius;
  const ballright = ball.x + ball.radius;

  return (
    ballright > pleft &&
    ballbottom > pTop &&
    ballleft < pright &&
    ballTop < pbottom
  );
}
function move(player: player) {
  if (player.direction === 'up') {
    if (player.y <= 10 && player.y >= 0) player.y = 0;
    else player.y -= 10;
  } else if (player.direction === 'down') {
    if (
      player.y + player.height <= table.height &&
      player.y + player.height >= table.height - 10
    )
      player.y = table.height - player.height;
    else player.y += 10;
  }
}
function resetBall(game: Game, ang: number) {
  game.ball.x = table.width / 2;
  game.ball.y = table.height / 2;
  game.ball.speed = 5;
  game.ball.velocityX = Math.cos(ang) * 5;
  game.ball.velocityY = Math.sin(ang) * 5;
  if (game.player2.serve === 1 && game.ball.velocityX > 0)
    game.ball.velocityX *= -1;
  if (game.player1.serve === 1 && game.ball.velocityX < 0)
    game.ball.velocityX *= -1;
  game.ball.space = 0;
  game.player1.y = table.height / 2 - (25 * table.height) / 100 / 2;
  game.player2.y = table.height / 2 - (25 * table.height) / 100 / 2;
}

const queue: Queue[] = [];
let currentGameId = -1;

const playersInGame = new Map<number, Game>();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     GATEWAY       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
    private prismaService: PrismaService,
  ) // private prismaService: PrismaService,
  {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     QUEUE       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('game.queue')
  handleMessage(client: Socket, mode: string) {
    const id = client.data.id;
    if (queue.find((q) => q.id === id)) {
      return 'Already in queue';
    } else if (playersInGame.get(id)) return 'Already in game';
    if (queue.length >= 1) {
      const toFind = queue[queue.length - 1];
      queue.splice(queue.indexOf(toFind), 1);
      const player1 = {
        id: toFind.id,
        width: 10,
        height: 150,
        x: 4,
        y: (table.height - 150) / 2,
        score: 0,
        serve: 1,
        direction: null,
        mode: toFind.mode,
        win: false,
      };
      const player2 = {
        id: id,
        width: 10,
        height: 150,
        x: table.width - 14,
        y: (table.height - 150) / 2,
        score: 0,
        serve: 0,
        direction: null,
        mode: mode,
        win: false,
      };
      const ang = getRandomIntInclusive(-0.785398, 0.785398);
      const game: Game = {
        player1,
        player2,
        ball: {
          x: table.width / 2,
          y: table.height / 2,
          velocityX: Math.cos(ang) * 5,
          velocityY: Math.sin(ang) * 5,
          speed: 5,
          space: 0,
          radius: 16,
        },
        id: ++currentGameId,
        ia: 0,
        p1ready: false,
        p2ready: false,
        scoretowin: 7,
      };
      playersInGame.set(player1.id, game);
      playersInGame.set(player2.id, game);
      this.server.in(`user-${player1.id}`).socketsJoin(`game-${game.id}`);
      this.server.in(`user-${player2.id}`).socketsJoin(`game-${game.id}`);
      this.server.to(`user-${player1.id}`).emit('setup', player1.mode);
      this.server.to(`user-${player2.id}`).emit('setup', player2.mode);
      // return 'Game found';
    } else {
      queue.push({ id: id, socket: client, mode: mode });
      return 'Added to queue';
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     READY       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('ready')
  playerReady(client: Socket) {
    const id = client.data.id;
    const game = playersInGame.get(id);
    if (game) {
      if (game.player1.id === id) {
        // game.player1.serve = 1;
        // game.player2.serve = 0;
        game.p1ready = true;
      } else {
        // game.player2.serve = 1;
        // game.player1.serve = 0;
        game.p2ready = true;
      }
      // this.server.to(`game-${game.id}`).emit('game.found', game);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     START       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('start')
  startGame(client: Socket) {
    const id = client.data.id;
    const game = playersInGame.get(id);
    if (game && game.player1.id && game.player2.id) {
      this.server
        .to(`user-${game.player1.id}`)
        .emit('user.status', { id, status: 'INGAME' });
      this.server
        .to(`user-${game.player2.id}`)
        .emit('user.status', { id, status: 'INGAME' });
    }
    if (game && game.p1ready && game.p2ready) {
      game.intervalId = setInterval(() => {
        if (game.ball.space === 1) {
          game.ball.x += game.ball.velocityX;
          game.ball.y += game.ball.velocityY;
        }
        move(game.player1);
        move(game.player2);
        if (
          (game.ball.y + game.ball.radius > table.height &&
            game.ball.velocityY > 0) ||
          (game.ball.y - game.ball.radius < 0 && game.ball.velocityY < 0)
        )
          game.ball.velocityY *= -1;
        let paddle =
          game.ball.x < table.width / 2 ? game.player1 : game.player2;
        if (collision(game.ball, paddle)) {
          let interPoint =
            (game.ball.y - (paddle.y + paddle.height / 2)) /
            (paddle.height / 2);
          let angle = interPoint * (Math.PI / 4);
          let direction = game.ball.x < table.width / 2 ? 1 : -1;
          game.ball.velocityX = direction * (Math.cos(angle) * game.ball.speed);
          game.ball.velocityY = Math.sin(angle) * game.ball.speed;
          game.ball.speed += 0.5;
        }
        if (game.ball.x - game.ball.radius < 0) {
          game.player2.score++;
          if (game.player2.score === game.scoretowin) {
            game.player2.win = true;
            this.server.in(`user-${game.player2.id}`).emit('game.over', "YOU WIN");
            this.server.in(`user-${game.player1.id}`).emit('game.over', "YOU LOSE");
            // this.server
            //   .to(`game-${game.id}`)
            //   .emit('game.over', omit(game, ['intervalId']));
          }
          game.player1.serve = 1;
          game.player2.serve = 0;
          resetBall(game, ang);
          game.ball.space = 0;
        } else if (game.ball.x + game.ball.radius > table.width) {
          game.player1.score++;
          if (game.player1.score === game.scoretowin) {
            game.player1.win = true;
            this.server.in(`user-${game.player1.id}`).emit('game.over', "YOU WIN");
            this.server.in(`user-${game.player2.id}`).emit('game.over', "YOU LOSE");
            // this.server
            //   .to(`game-${game.id}`)
            //   .emit('game.over', omit(game, ['intervalId']));
          }
          game.player2.serve = 1;
          game.player1.serve = 0;
          resetBall(game, ang);
          game.ball.space = 0;
        }
        this.server
          .to(`game-${game.id}`)
          .emit('game.found', omit(game, ['intervalId']));
      }, 15);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     CANCEL       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('cancel')
  cancelQueue(client: any) {
    console.log("cancel");
    const id = client.data.id;
    const index = queue.findIndex((q) => q.id === id);
    if (index !== -1) {
      queue.splice(index, 1);
      return 'Removed from queue';
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     MOVE       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('game.move')
  movPlayer(client: any, direction: ' ' | 'up' | 'down' | null) {
    const id = client.data.id;
    const game = playersInGame.get(id);

    if (game) {
      let player: player;
      if (game.player1.id == id) {
        player = game.player1;
      } else {
        player = game.player2;
      }
      if (direction === ' ') {
        if (player.serve === 1) game.ball.space = 1;
      } else {
        player.direction = direction;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     READY       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @SubscribeMessage('in')
  palywithfriend(client: any, uid: string) {
    // console.log("in"); 
    const id = client.data.id;
    const game = playersInGame.get(id);
    // if (game && game.intervalId) 
    // {
    //   this.server
    //   .to(`user-${id}`)
    //   .emit('friend.left');
    // }
    if (game) {
      this.server.in(`user-${client.data.id}`).socketsJoin(`game-${game.id}`);
      this.server
        .to(`user-${game.player1.id}`)
        .emit('come', { id: uid, mode: game.player1.mode });
    }
    else{
      this.server
      .to(`user-${id}`)
      .emit('friend.left');
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     AI       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('play.ai')
  palywithIA(client: Socket) {
    const id = client.data.id;
    if (playersInGame.get(id)) return 'Already in game';
    const player1 = {
      width: 10,
      height: 150,
      x: 4,
      y: (table.height - 150) / 2,
      score: 0,
      serve: 0,
      direction: null,
      win: false,
    };
    const player2 = {
      id: id,
      width: 10,
      height: 150,
      x: table.width - 14,
      y: (table.height - 150) / 2,
      score: 0,
      serve: 1,
      direction: null,
      win: false,
    };
    const ang = getRandomIntInclusive(-0.785398, 0.785398);
    const game: Game = {
      player1,
      player2,
      ball: {
        x: table.width / 2,
        y: table.height / 2,
        velocityX: Math.cos(ang) * 5 * -1,
        velocityY: Math.sin(ang) * 5,
        speed: 5,
        space: 0,
        radius: 16,
      },
      id: ++currentGameId,
      ia: 1,
      p1ready: true,
      p2ready: true,
      scoretowin: 7,
    };
    this.server.in(`user-${player2.id}`).socketsJoin(`game-${game.id}`);
    playersInGame.set(player2.id, game);
    this.server
      .to(`game-${game.id}`)
      .emit('game.found', omit(game, ['intervalId']));
    let a = 1;
    let tap = 0;
    client.emit('user.status', { id, status: 'INGAME' });
    // this.server.to(`user-${player2.id}`).emit('user.status', {id, status:"INGAME"});
    game.intervalId = setInterval(() => {
      if (game.ball.space === 1) {
        game.ball.x += game.ball.velocityX;
        game.ball.y += game.ball.velocityY;
        if (tap === 5) {
          if (a <= 0.8) a = 1;
          a -= 0.03;
          tap = 0;
          console.log(a);
        }
        game.player1.y = (game.ball.y - game.player2.height / 2) * a;
        if (game.player1.y < 0) game.player1.y = 0;
        else if (game.player1.y + game.player1.height > table.height)
          game.player1.y = table.height - game.player1.height;
      }
      move(game.player2);
      if (
        (game.ball.y + game.ball.radius > table.height &&
          game.ball.velocityY > 0) ||
        (game.ball.y - game.ball.radius < 0 && game.ball.velocityY < 0)
      )
        game.ball.velocityY *= -1;
      let paddle = game.ball.x < table.width / 2 ? game.player1 : game.player2;
      if (collision(game.ball, paddle)) {
        tap++;
        let interPoint =
          (game.ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        let angle = interPoint * (Math.PI / 4);
        let direction = game.ball.x < table.width / 2 ? 1 : -1;
        game.ball.speed += 0.5;
        game.ball.velocityX = direction * (Math.cos(angle) * game.ball.speed);
        game.ball.velocityY = Math.sin(angle) * game.ball.speed;
      } else {
        if (game.ball.x - game.ball.radius < 0) {
          player2.score++;
          if (player2.score === game.scoretowin) {
            player2.win = true;
            // this.server.in(`user-${player2}`).emit('game.over', game);
            this.server.to(`game-${game.id}`).emit('game.over', "YOU WIN");
          }
          a = 1;
          tap = 0;
          resetBall(game, ang);
          game.ball.space = 0;
        } else if (game.ball.x + game.ball.radius > table.width) {
          player1.score++;
          if (player1.score === game.scoretowin) {
            player1.win = true;
            this.server.to(`game-${game.id}`).emit('game.over', "YOU LOSE");
          }
          a = 1;
          tap = 0;
          resetBall(game, ang);
          game.ball.space = 0;
        }
      }
      this.server
        .to(`game-${game.id}`)
        .emit('game.found', omit(game, ['intervalId']));
    }, 1000 / 60);
    return 'Game found';
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     END       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @SubscribeMessage('end')
  async handleDisconnect(client: Socket) {
    const id = client.data.id;
    const game = playersInGame.get(id);
    console.log("end");
    console.log(game);
    

    if (game?.id && game.player1?.id && game.player2?.id) {
      const winnerPlayer = game.player1.win ? game.player1 : game.player2.win ? game.player2 : null;
      const loserPlayer = winnerPlayer === game.player1 ? game.player2 : game.player1;
      console.log("hi");
      if (winnerPlayer && winnerPlayer.id && loserPlayer.id && game.id) {
        await this.prismaService.game.create({
          data: {
            id: game.id,
            userscore: game.player1.score,
            opponentscore: game.player2.score,
            wins: {
              create: {
                userId: winnerPlayer.id,
              },
            },
          },
        });

        await this.prismaService.loss.create({
          data: {
            userId: loserPlayer.id,
            gameId: game.id,
          },
        });
        
        const user = await this.prismaService.user.findUnique({
          where: {
            id: winnerPlayer.id,
          },
        })

        console.log(user);
      }
    }

    if (game) {
      clearInterval(game.intervalId);
      // this.server.to(`game-${game.id}`).emit('game.over', game);

      if (game.player1.id) {
        playersInGame.delete(game.player1.id);
        this.server.to(`game-${game.id}`).emit('game.end', game);
        this.server
          .in(`user-${game.player1.id}`)
          .socketsLeave(`game-${game.id}`);
      }

      if (game.player2.id) {
        this.server
          .in(`user-${game.player2.id}`)
          .socketsLeave(`game-${game.id}`);
        playersInGame.delete(game.player2.id);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     KILL.INTERVAL       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('kill.interval')
  clear(client: Socket) {
    const id = client.data.id;
    const game = playersInGame.get(id);
    if (game) {
      clearInterval(game.intervalId);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //     INVITE       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @SubscribeMessage('invite')
  creatClash(
    client: Socket,
    body: { id: number; mode: string; uid: string; value: number },
  ) {
    const check = playersInGame.get(client.data.id);
    // const id = client.data.id;
    if (check) {
      return 'Already in game';
    }
    const player1 = {
      id: client.data.id,
      width: 10,
      height: 150,
      x: 4,
      y: (table.height - 150) / 2,
      score: 0,
      serve: 1,
      direction: null,
      mode: body.mode,
      win: false,
    };
    const player2 = {
      id: body.id,
      width: 10,
      height: 150,
      x: table.width - 14,
      y: (table.height - 150) / 2,
      score: 0,
      serve: 0,
      direction: null,
      mode: body.mode,
      win: false,
    };
    const ang = getRandomIntInclusive(-0.785398, 0.785398);
    const game: Game = {
      player1,
      player2,
      ball: {
        x: table.width / 2,
        y: table.height / 2,
        velocityX: Math.cos(ang) * 5,
        velocityY: Math.sin(ang) * 5,
        speed: 5,
        space: 0,
        radius: 16,
      },
      id: ++currentGameId,
      ia: 0,
      p1ready: false,
      p2ready: false,
      scoretowin: body.value,
    };
    playersInGame.set(player1.id, game);
    playersInGame.set(player2.id, game);
    this.server.in(`user-${player1.id}`).socketsJoin(`game-${game.id}`);
    // this.server.to(`game-${game.id}`).emit('setup');
    const frontend_url = this.configService.get('FRONTEND_URL');
    this.eventEmitter.emit(
      'game.invite',
      player1.id,
      player2.id,
      `${frontend_url}/game/playground/${body.mode}/${body.uid}`,
    );
  }
}
