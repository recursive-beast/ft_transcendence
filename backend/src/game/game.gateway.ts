import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Queue {
  id: number;
  mode: string;
  socket: Socket;
};
interface player{
  id: number;
  socket: Socket;
  x: number;
  y: number;
  width: number;
  hight: number;
};

interface Game {
  player1: player;
  player2: player;
  mode: string;
};

const table = {
 height  : 700,
 width : 700 * (16 / 9),
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
      const player1 : player = {id:toFind.id, socket:toFind.socket, width:10, hight:150, x:0, y:(table.height - 150) / 2};
      const player2 : player = {id:id, socket:client, width:10, hight:150, x:table.width - 10, y:(table.height - 150) / 2};
      const game : Game = {player1, player2, mode: mode};
      // games.push(game);
      games.set(`game-${++currentGameId}`,game);
      client.join(`game-${currentGameId}`);
      this.server.in(`user-${toFind.id}`).socketsJoin(`game-${currentGameId}`);
      // this.server.to(`user-${toFind.id}`)
      // this.server.to(`user-${toFind.id}`).emit('game.found', game);
      // this.server.to(`user-${id}`).emit('game.found', game);
      return 'Game found';
    }
    else {
      queue.push({id: id, mode: mode, socket: client});
      return 'Added to queue';
    }
  }
  @SubscribeMessage('cancel')
  cancelQueue(client: any, payload: any) {
    const id = client.data.id;
    const index = queue.findIndex((q) => q.id === id);
    if (index !== -1) {
      queue.splice(index, 1);
      return 'Removed from queue';
    }
  }
}

//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

