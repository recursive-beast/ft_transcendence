import { SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BaseGateway } from 'src/common/base.gateway';
import { ConversationService } from './conversation.service';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ConversationGateway {
    constructor(private readonly conversationService: ConversationService) {}
    
    @WebSocketServer()
    server: Server;
    
    
    // handleConnection(client: Socket, ...args: any[])
    // {

    // }

    // @SubscribeMessage('conversation.create')
}
