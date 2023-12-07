import { SubscribeMessage,WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Queue {
  id: number;
  mode: string;
  socket: Socket;
};
interface player{
  id?: number;
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
  serve: number;
  direction : "up"|"down"|null;
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
  id?: number;
  ia : number;
};
function getRandomIntInclusive(min : number, max : number) {
  return Math.random() * (max - min) + min;
}
const ang = getRandomIntInclusive(-0.785398,0.785398);
const table = {
  height  : 700,
  width : 700 * (16 / 9),
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
function move(player:player){
  if(player.direction === 'up'){
        if(player.y <= 10 && player.y >= 0)
          player.y = 0;
        else
          player.y -= 10;
      }
  else if(player.direction === 'down'){
        if(player.y +  player.height <= table.height && player.y + player.height >= table.height - 10)
          player.y = table.height - player.height;
        else
          player.y += 10;
      }

}
// function moveBot(player:player, ball:Ball){
//   if(ball.x < table.width/2 && ball.y  < player.y){
//         if(player.y <= 25 && player.y >= 0)
//           player.y = 0;
//         else
//           player.y -= 25;
//       }
//   else if(ball.x < table.width/2 && ball.y > player.y + player.height){
//         if(player.y +  player.height <= table.height && player.y + player.height >= table.height - 25)
//           player.y = table.height - player.height;
//         else
//           player.y += 25;
//       }

// }
function resetBall(game:Game, ang: number){
  game.ball.x = table.width/2;
  game.ball.y = table.height/2;
  game.ball.speed = 5;
  game.ball.velocityX = (Math.cos(ang) * 5) * -1;
  game.ball.velocityY = Math.sin(ang) * 5;
  game.ball.space = 0;
  game.player1.y = (table.height/2) - (((25 * table.height) / 100)/2);
  game.player2.y = (table.height/2) - (((25 * table.height) / 100)/2);
}
const queue: Queue[] = []; 
let currentGameId = -1;

const games = new Map<string,Game>();
const s = new Map<number,Game>();
@WebSocketGateway()
export class GameGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('game.queue')
  handleMessage(client: Socket, payload: any) {
    
    const id = client.data.id;
    const mode = payload.mode;
    if (queue.find((q) => q.id === id)) {
      return 'Already in queue';
    }
    const toFind = queue.find((q) => q.mode === mode);
    if(toFind){
      queue.splice(queue.indexOf(toFind), 1);
      const player1 = {id:toFind.id, width:10, height:150, x:0, y:(table.height - 150) / 2, score:0, serve:1,direction:null};
      const player2 = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2, score:0, serve:0,direction:null};
      const ang = getRandomIntInclusive(-0.785398,0.785398);
      const game : Game = {player1, player2,ball: {
        x: table.width / 2,
        y: table.height / 2,
        velocityX: Math.cos(ang) * 5,
        velocityY:  Math.sin(ang) * 5,
        speed: 5,
        space : 0,
        radius : 16,
      }, mode: mode, id:++currentGameId, ia:0};
      s.set(player1.id,game);
      s.set(player2.id,game);
      games.set(`game-${game.id}`,game);
      this.server.in(`user-${player1.id}`).socketsJoin(`game-${game.id}`);
      this.server.in(`user-${player2.id}`).socketsJoin(`game-${game.id}`);
      this.server.to(`game-${game.id}`).emit('game.found', game);
      setInterval(() => {
        if (game.ball.space === 1){
          game.ball.x += game.ball.velocityX;
          game.ball.y += game.ball.velocityY;
      }
      if(game.ball.y + game.ball.radius > table.height || game.ball.y - game.ball.radius < 0)
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
          if (player2.score === 3)
            this.server.to(`game-${game.id}`).emit('game.over', game);
          player1.serve = 1;
          player2.serve = 0;
          resetBall(game,ang);
          game.ball.space = 0;
      }
      else if(game.ball.x + game.ball.radius > table.width){
          player1.score++;
          if (player1.score === 3)
            this.server.to(`game-${game.id}`).emit('game.over', game);
          player2.serve = 1;
          player1.serve = 0;
          resetBall(game,ang);
          game.ball.x = table.width / 2;
          game.ball.y = table.height / 2;
          game.ball.space = 0;
      }
      this.server.to(`game-${game.id}`).emit('game.found', game);
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
  movPlayer(client: any,direction: " " | "up" | "down" | null ){
    const id = client.data.id;
    const game = s.get(id);

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

      //   
      //   }
      //   if (game.ia === 0)
      //       this.server.to(`game-${game.id}`).emit('game.found', game);
      //   else
      //     client.emit('game.found',game);
    }
  }
  @SubscribeMessage('play.friend')
  palywithfriend(client: any){
    
  }
  @SubscribeMessage('play.ia')
  palywithIA(client: Socket, payload: any) {
    
    console.log(client);
    const id = client.data.id;
    const mode = payload.mode;
    const player2 = {id:-1, width:10, height:150, x:0, y:(table.height - 150) / 2, score:0, serve:0, direction: null};
    const player1 = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2, score:0, serve:1, direction: null};
    const ang = getRandomIntInclusive(-0.785398,0.785398);
    const game : Game = {player1, player2,ball: {
      x: table.width / 2,
      y: table.height / 2,
      velocityX: (Math.cos(ang) * 5) * -1,
      velocityY:  Math.sin(ang) * 5,
      speed: 5,
      space : 0,
      radius : 16,
    }, mode: mode, id:++currentGameId, ia:1};
    s.set(player1.id,game);
    client.emit('game.found',game);
    let a = 1;
    let tap = 0;
    setInterval(() => {
      if (game.ball.space === 1){
        game.ball.x += game.ball.velocityX;
        game.ball.y += game.ball.velocityY;
        if (tap === 5){
          if (a <= 0.8)
            a = 1;
          a -= 0.03;
          tap = 0;
          console.log(a);
        }
        
        game.player2.y = (game.ball.y - (game.player2.height / 2)) * a;
        if(game.player2.y < 0)
        game.player2.y = 0;
      else if(game.player2.y + game.player2.height > table.height)
      game.player2.y = table.height - game.player2.height;
      // moveBot(game.player2, game.ball);
  }
    move(game.player1);
    if(game.ball.y + game.ball.radius > table.height && game.ball.velocityY > 0 || game.ball.y - game.ball.radius < 0 && game.ball.velocityY < 0)
        game.ball.velocityY *= -1;
    let paddle = (game.ball.x < table.width/2) ? game.player2 : game.player1;
    if(collision(game.ball, paddle)){
        tap++;
        let interPoint = (game.ball.y - (paddle.y + paddle.height/2)) / (paddle.height/2);
        let angle = interPoint * (Math.PI/4);
        let direction = (game.ball.x < table.width/2) ? 1 : -1;
        game.ball.velocityX = direction * (Math.cos(angle) * game.ball.speed);
        game.ball.velocityY = Math.sin(angle) * game.ball.speed;
        // if (game.ball.speed < 12)
          game.ball.speed += 0.5
        // console.log(game.ball.speed);
    }
    else{
      if(game.ball.x - game.ball.radius < 0){
          player2.score++;
          // player1.serve = 1;
          // player2.serve = 0;
          if (player2.score === 3)
            this.server.to(`game-${game.id}`).emit('game.over', game);
          a = 1;
          tap = 0;
          resetBall(game,ang);
          game.ball.space = 0;
      }
      else if(game.ball.x + game.ball.radius > table.width){
          player1.score++;
          if (player1.score === 3)
            this.server.to(`game-${game.id}`).emit('game.over', game);
          // player2.serve = 1;
          // player1.serve = 0;
          a = 1;
          tap = 0;
          resetBall(game,ang);
          // game.ball.x = table.width / 2;
          // game.ball.y = table.height / 2;
          game.ball.space = 0;
      }
    }
    client.emit('game.found',game);
    },15)
    return 'Game found';
    
  }
  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    const id = client.data.id;
    const game = s.get(id);
    if (game) {
      this.server.to(`game-${game.id}`).emit('game.over', game);
      if (game.player1.id && game.player2.id){
        s.delete(game.player1.id);
        s.delete(game.player2.id);
      }
      games.delete(`game-${game.id}`);
      this.server.to(`game-${game.id}`).emit('game.end', game);
    }
  }
  // palywithIA(client: Socket, payload: any){
  //   const id = client.data.id;
  //   const mode = payload.mode;

  //   const player1  = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2, score:0, serve:1};
  //   const player2 : player = {width:10, height:150, x:0, y:(table.height - 150) / 2, score:0, serve:0};
  //   const game : Game = {player1, player2,ball: {...ball}, mode: mode, ia:1};
  //   s.set(player1.id,game);

  //   client.emit('game.found',game);
  //   setInterval(() => {
  //     if (game.ball.space === 1){
  //       game.ball.x += game.ball.velocityX;
  //       game.ball.y += game.ball.velocityY;
  //       game.player2.y = game.ball.y -  (game.player2.height / 2);
  //   }
  //   if(game.ball.y + game.ball.radius > table.height || game.ball.y - game.ball.radius < 0)
  //       game.ball.velocityY *= -1;
  //   let paddle = (game.ball.x < table.width/2) ? game.player1 : game.player2;
  //   if(collision(game.ball, paddle)){
  //       let interPoint = (game.ball.y - (paddle.y + paddle.height/2)) / (paddle.height/2);
  //       let angle = interPoint * (Math.PI/4);
  //       let direction = (game.ball.x < table.width/2) ? 1 : -1;
  //       game.ball.velocityX = direction * (Math.cos(angle) * game.ball.speed);
  //       game.ball.velocityY = Math.sin(angle) * game.ball.speed;
  //       game.ball.speed += 0.5
  //   }
  //   if(game.ball.x - game.ball.radius < 0){
  //       player2.score++;
  //       // player1.serve = 1;
  //       // player2.serve = 0;
  //       resetBall(game);
  //       game.ball.space = 0;
  //   }
  //   else if(game.ball.x + game.ball.radius > table.width){
  //       player1.score++;
  //       // player2.serve = 1;
  //       // player1.serve = 0;
  //       resetBall(game);
  //       // game.ball.x = table.width / 2;
  //       // game.ball.y = table.height / 2;
  //       game.ball.space = 0;
  //   }
  //   client.emit('game.found',game);
    
  //   },15)
  //   return 'Game found';
  // }
  

}

//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

