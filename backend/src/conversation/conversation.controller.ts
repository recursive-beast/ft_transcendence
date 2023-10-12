import {
    Body,
    Controller,
    Get,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    SerializeOptions,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Get()
    getConversation() {
        return [1, 2];
    }

    @Get(':id')
    getConversationById(@Param('id') id: number) {
        return this.conversationService.findOne(id);
    }

    @Post()
    createConversation() {
        return [];
    }

}
