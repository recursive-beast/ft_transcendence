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
import { ConversationDTO } from './dto/conversation.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';

@Controller('conversations')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Get()
    getAllConversation() {
        return [1, 2];
    }

    @Get(':id')
    getConversationById(@Param('id') id: number) {
        return this.conversationService.findOne(id);
    }

    @Post()
    createConversation(@CurrentUser() user: UserEntity, @Body() newConv: ConversationDTO) {
        return this.conversationService.createOne(newConv, user);
    }

}
