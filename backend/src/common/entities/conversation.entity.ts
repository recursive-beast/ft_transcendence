import { User } from '@prisma/client'
import { Conversation } from '@prisma/client';
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { UserEntity } from './user.entity';

export class ConversationEntity implements Conversation {
    @Expose()
    id: number;

    @Expose()
    isGroup: boolean;
    
    @Expose()
    adminId: number;

    @Expose()
    title: string;

    @Expose()
    @Type(() => UserEntity)
    members?: UserEntity[];
    
    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;

    static fromConversation(conversation: Conversation): ConversationEntity;
    static fromConversation(conversation: Conversation[]): ConversationEntity[];
    static fromConversation(conversation: Conversation | Conversation[]): ConversationEntity | ConversationEntity[] {
        return plainToInstance(ConversationEntity, conversation, {
        ignoreDecorators: true,
        excludeExtraneousValues: true,
        });
    }
}