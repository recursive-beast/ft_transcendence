import { Message, User } from '@prisma/client'
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { UserEntity } from './user.entity';

export class MessageEntity implements Message {
    @Expose()
    id: number;

    @Expose()
    conversationId: number;
    
    @Expose()
    senderId: number;

    @Expose()
    text: string;
    
    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;

    static fromMessage(message: Message): MessageEntity;
    static fromMessage(message: Message[]): MessageEntity[];
    static fromMessage(message: Message | Message[]): MessageEntity | MessageEntity[] {
        return plainToInstance(MessageEntity, message, {
        ignoreDecorators: true,
        excludeExtraneousValues: true,
        });
    }
}