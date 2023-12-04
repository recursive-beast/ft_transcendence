import { SubscribeMessage,WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Queue {
  id: number;
  mode: string;
  socket: Socket;
};
interface player{
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
  serve: number;
};

interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  space: number;
  radius: number;
};
interface Game {
  player1: player;
  player2: player;
  ball: Ball;
  mode: string;
  id : number;
  finish : number;
};

const table = {
  height  : 700,
  width : 700 * (16 / 9),
};
const ball : Ball = {
  x: table.width / 2,
  y: table.height / 2,
  velocityX: 5,
  velocityY: 5,
  speed: 5,
  space : 0,
  radius : 16,
};
function collision(ball: Ball, paddle : player){
    
  const pTop = paddle.y;
  const pbottom = paddle.y + paddle.height;
  const pleft = paddle.x;
  const pright = paddle.x + paddle.width;
  const ballTop = ball.y - ball.radius;
  const ballbottom = ball.y + ball.radius;
  const ballleft = ball.x - ball.radius;
  const ballright = ball.x + ball.radius;

  return ballright > pleft && ballbottom > pTop && ballleft < pright && ballTop < pbottom
}
function resetBall(game:Game){
  game.ball.x = table.width/2;
  game.ball.y = table.height/2;
  game.ball.speed = 5;
  game.ball.velocityX *= -1;
  game.ball.space = 0;
  game.player1.y = (table.height/2) - (((25 * table.height) / 100)/2);
  game.player2.y = (table.height/2) - (((25 * table.height) / 100)/2);
}
const queue: Queue[] = []; 
// const games: Game[] = [];
let currentGameId = -1;

const games = new Map<string,Game>();
const s = new Map<number,Game>();
@WebSocketGateway()
export class GameGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('game.queue')
  handleMessage(client: Socket, payload: any) {
    const id = client.data.id;
    // console.log(id);
    const mode = payload.mode;
    if (queue.find((q) => q.id === id)) {
      return 'Already in queue';
    }
    const toFind = queue.find((q) => q.mode === mode);
    if(toFind){
      queue.splice(queue.indexOf(toFind), 1);
      const player1 : player = {id:toFind.id, width:10, height:150, x:0, y:(table.height - 150) / 2, score:0, serve:1};
      const player2 : player = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2, score:0, serve:0};
      const game : Game = {player1, player2,ball: {...ball}, mode: mode, id:++currentGameId, finish:0};
      s.set(player1.id,game);
      s.set(player2.id,game);
      // games.push(game);
      games.set(`game-${game.id}`,game);
      this.server.in(`user-${player1.id}`).socketsJoin(`game-${game.id}`);
      this.server.in(`user-${player2.id}`).socketsJoin(`game-${game.id}`);
      this.server.to(`game-${game.id}`).emit('game.found', game);
      setInterval(() => {
        if (game.ball.space === 1){
          game.ball.x += game.ball.velocityX;
          game.ball.y += game.ball.velocityY;
      }
      if (table.width >= table.height)
     { if(game.ball.y + game.ball.radius > table.height || game.ball.y - game.ball.radius < 0)
          game.ball.velocityY *= -1;
      let paddle = (game.ball.x < table.width/2) ? game.player1 : game.player2;
      if(collision(game.ball, paddle)){
          let interPoint = (game.ball.y - (paddle.y + paddle.height/2)) / (paddle.height/2);
          let angle = interPoint * (Math.PI/4);
          let direction = (game.ball.x < table.width/2) ? 1 : -1;
          game.ball.velocityX = direction * (Math.cos(angle) * game.ball.speed);
          game.ball.velocityY = Math.sin(angle) * game.ball.speed;
          game.ball.speed += 0.5
      }
      if(game.ball.x - game.ball.radius < 0){
          player2.score++;
          // if (player2.score)
          //   this.server.to(`game-${game.id}`).emit('game.finish', game);
          player1.serve = 1;
          player2.serve = 0;
          resetBall(game);
          game.ball.space = 0;
      }
      else if(game.ball.x + game.ball.radius > table.width){
          player1.score++;
          // if (player1.score)
          //   this.server.to(`game-${game.id}`).emit('game.finish', game);
          player2.serve = 1;
          player1.serve = 0;
          resetBall(game);
          game.ball.x = table.width / 2;
          game.ball.y = table.height / 2;
          game.ball.space = 0;
      }
      this.server.to(`game-${game.id}`).emit('game.found', game);
    }
      },15)
      return 'Game found';
    }
    else {
      queue.push({id: id, mode: mode, socket: client});
      return 'Added to queue';
    }
  }

  @SubscribeMessage('cancel')
  cancelQueue(client: any) {
    const id = client.data.id;
    const index = queue.findIndex((q) => q.id === id);
    if (index !== -1) {
      queue.splice(index, 1);
      return 'Removed from queue';
    }
  }
  @SubscribeMessage('game.move')
  movPlayer(client: any,direction: string ){
    const id = client.data.id;
    const game = s.get(id);
    if(game){
      let player : player;
      if (game.player2.id == id){
        player = game.player2;
      }
      else{
        player = game.player1;
      }
      if (direction === ' ' && player.serve === 1)
      {
          game.ball.space = 1;
      }
    
      else if(direction === 'up' || direction === 'right'){
        if(player.y <= 25 && player.y >= 0)
          player.y = 0;
        else
          player.y -= 25;
      }
      else if(direction === 'down'|| direction === 'left'){
        if(player.y +  player.height <= table.height && player.y + player.height >= table.height - 25)
          player.y = table.height - player.height;
        else
          player.y += 25;

      }

      this.server.to(`game-${game.id}`).emit('game.found', game);

    }
  }
  

}

//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

