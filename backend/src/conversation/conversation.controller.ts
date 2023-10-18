import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDTO } from './dto/conversation.dto';
import { MessageDTO } from './dto/message.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';

@Controller('conversations')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Get()
    getAllConversation() {
        return this.conversationService.getAll();
    }

    @Get(':id')
    getConversationById(@Param('id') id: number) {
        return this.conversationService.findOne(id);
    }

    @Get(':id/messages')
    async getMessages(@Param('id') id: number) {
        const conversation = await this.conversationService.getMessages(id);
        return {messages: conversation.messages};
    }

    @Post()
    createConversation(@CurrentUser() user: UserEntity, @Body() newConv: ConversationDTO) {
        return this.conversationService.createOne(newConv, user);
    }

    @Post(':id/messages')
    sendMessages(@CurrentUser() user: UserEntity, @Body() newMsg: MessageDTO, @Param('id') id: number){
        return this.conversationService.sendMes(user, newMsg, id);
    }

    @Patch(':id')
    async updateGroupTitle(@CurrentUser() user: UserEntity, @Body('title') body: string, @Param('id') id: number) {
        return {data: await this.conversationService.updateTitle(user.id, body, id) };
    }
}
