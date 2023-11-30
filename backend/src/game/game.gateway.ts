import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

interface Queue {
  id: number;
  mode: string;
};

interface Game {
  player1: number;
  player2: number;
  mode: string;
};

const queue: Queue[] = []; 
const games: Game[] = [];

@WebSocketGateway()
export class GameGateway {

@WebSocketServer() server: Server;

  @SubscribeMessage('game.queue')
  handleMessage(client: any, payload: any) {
    const id = client.data.id;
    const mode = payload.mode;
    if (queue.find((q) => q.id === id)) {
      return 'Already in queue';
    }
    const toFind = queue.find((q) => q.mode === mode);
    if(toFind){
      queue.splice(queue.indexOf(toFind), 1);
      const game = {player1: toFind.id, player2: id, mode: mode}
      games.push(game);
      this.server.to(`user-${toFind.id}`).emit('game.found', game);
      this.server.to(`user-${id}`).emit('game.found', game);
      return 'Game found';
    }
    else {
      queue.push({id: id, mode: mode});
      return 'Added to queue';
    }
  }

  
}

//crate front end for testing queue


// create romm for players and send them game data
// create game data
// paddle handler

