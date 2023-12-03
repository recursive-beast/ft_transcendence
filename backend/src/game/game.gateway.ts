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
};

interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  space: number;
};
interface Game {
  player1: player;
  player2: player;
  ball: Ball;
  mode: string;
  id : number;
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
  speed: 1,
  space : 0,
};

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
      const player1 : player = {id:toFind.id, width:10, height:150, x:0, y:(table.height - 150) / 2};
      const player2 : player = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2};
      const game : Game = {player1, player2,ball: {...ball}, mode: mode, id:++currentGameId};
      s.set(player1.id,game);
      s.set(player2.id,game);
      // games.push(game);
      games.set(`game-${game.id}`,game);
      this.server.in(`user-${player1.id}`).socketsJoin(`game-${game.id}`);
      this.server.in(`user-${player2.id}`).socketsJoin(`game-${game.id}`);
      this.server.to(`game-${game.id}`).emit('game.found', game);
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
      if (direction === ' ')
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

      setInterval(() =>{
    //     function collision(ball, paddle){
    
    //       const pTop = paddle.y;
    //       const pbottom = paddle.y + paddle.height;
    //       const pleft = paddle.x;
    //       const pright = paddle.x + paddle.width;
    //       const ballTop = ball.y - ball.radius;
    //       const ballbottom = ball.y + ball.radius;
    //       const ballleft = ball.x - ball.radius;
    //       const ballright = ball.x + ball.radius;
      
    //       return ballright > pleft && ballbottom > pTop && ballleft < pright && ballTop < pbottom
    //   }
    //   function resetBall(){
    //     ball.x = canvas.width/2;
    //     ball.y = canvas.height/2;
    //     ball.speed = (0.625 * canvas.width) / 100;
    //     ball.velocityX *= -1;
    //     ball.space = 0;
    //     paddleB.y = (canvas.height/2) - (((25 * canvas.height) / 100)/2);
    //     paddleA.y = (canvas.height/2) - (((25 * canvas.height) / 100)/2);
    // }
    
    // function update(){
    //     if (ball.space === 1){
    //         ball.x += ball.velocityX;
    //         ball.y += ball.velocityY;
    //     }
    //     if (canvas.width >= canvas.height)
    //    { if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
    //         ball.velocityY *= -1;
    //     let paddle = (ball.x < canvas.width/2) ? paddleA : paddleB;
    //     if(collision(ball, paddle)){
    //         let interPoint = (ball.y - (paddle.y + paddle.height/2)) / (paddle.height/2);
    //         // console.log("interPoint =",interPoint);
    //         let angle = interPoint * (Math.PI/4);
    //         let direction = (ball.x < canvas.width/2) ? 1 : -1;
    //         ball.velocityX = direction * (Math.cos(angle) * ball.speed);
    //         ball.velocityY = Math.sin(angle) * ball.speed;
    //         ball.speed += 0.5
    //     }
    //     if(ball.x - ball.radius < 0){
    //         paddleB.score++;
    //         recalculate();
    //         ball.space = 0;
    //     }
    //     else if(ball.x + ball.radius > canvas.width){
    //         paddleA.score++;
    //         recalculate();
    //         ball.space = 0;
    //     }}
    //     else{
    //       if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0)
    //           ball.velocityX *= -1;
    //       let paddle = (ball.y < canvas.height/2) ? paddleA : paddleB;
    //       if(collision(ball, paddle)){
    //           let interPoint = (ball.x - (paddle.x + paddle.width/2)) / (paddle.width/2);
    //           // console.log("interPoint =",interPoint);
    //           let angle = interPoint * (Math.PI/4);
    //           let direction = (ball.y < canvas.height/2) ? 1 : -1;
    //           ball.velocityX = Math.sin(angle) * ball.speed;
    //           ball.velocityY = direction *(Math.cos(angle) * ball.speed);
    //           ball.speed += 0.1
    //       }
    //       if(ball.y - ball.radius < 0){
    //           paddleB.score++;
    //           recalculate();
    //           ball.space = 0;
    //       }
    //       else if(ball.y + ball.radius > canvas.height){
    //           paddleA.score++;
    //           recalculate();
    //           ball.space = 0;
    //       }
    //       }
    //   }
      })
    }
  }
  
}

//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

