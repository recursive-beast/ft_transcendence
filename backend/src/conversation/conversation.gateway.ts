import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BaseGateway } from 'src/common/base.gateway';


@WebSocketGateway()
export class ConversationGateway extends BaseGateway {
    @WebSocketServer()
    server: Server;
    
}
