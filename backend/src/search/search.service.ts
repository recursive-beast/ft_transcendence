import { Injectable } from '@nestjs/common';
import { GroupConversation, User } from '@prisma/client';
import Fuse from 'fuse.js';
import { PrismaService } from 'nestjs-prisma';
import { GroupConversationEntity } from 'src/common/entities/group-conversation.entity';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}

  async filterUsers(search: string) {
    const users = await this.prismaService.user.findMany();
    const keys: (keyof User)[] = ['fullName', 'displayName'];
    const fuse = new Fuse(users, { keys, threshold: 0.2 });
    const filtered = fuse.search(search).map((elem) => elem.item);

    return UserEntity.fromUser(filtered);
  }

  async filterGroupConversations(search: string) {
    const groups = await this.prismaService.groupConversation.findMany();
    const keys: (keyof GroupConversation)[] = ['title'];
    const fuse = new Fuse(groups, { keys, threshold: 0.3 });
    const filtered = fuse.search(search).map((elem) => elem.item);

    return GroupConversationEntity.fromGroupConversation(filtered);
  }
}
