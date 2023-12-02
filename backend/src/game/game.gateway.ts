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
@WebSocketGateway()
export class GameGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('game.queue')
  handleMessage(client: Socket, payload: any) {
    const id = client.data.id;
    console.log(id);
    const mode = payload.mode;
    if (queue.find((q) => q.id === id)) {
      return 'Already in queue';
    }
    const toFind = queue.find((q) => q.mode === mode);
    if(toFind){
      queue.splice(queue.indexOf(toFind), 1);
      const player1 : player = {id:toFind.id, width:10, height:150, x:0, y:(table.height - 150) / 2};
      const player2 : player = {id:id, width:10, height:150, x:table.width - 10, y:(table.height - 150) / 2};
      const game : Game = {player1, player2,ball: {...ball}, mode: mode};
      // games.push(game);
      games.set(`game-${++currentGameId}`,game);
      this.server.in(`user-${player1.id}`).socketsJoin(`game-${currentGameId}`);
      this.server.in(`user-${player2.id}`).socketsJoin(`game-${currentGameId}`);
      this.server.to(`game-${currentGameId}`).emit('game.found', game);
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
    const game = games.get(`game-${id}`);
    if(game){
      if(direction === 'up'){
        game.player1.y -= 10;
      }
      else if(direction === 'down'){
        game.player1.y += 10;
      }
      // use game id instead of user id
      this.server.to(`game-${id}`).emit('game.found', game);
    }
  }
  
}
//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

