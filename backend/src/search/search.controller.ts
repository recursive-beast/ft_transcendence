import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/common/entities/user.entity';
import { QueryDto } from './dto/query';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('users')
  users(@CurrentUser() user: UserEntity, @Query() dto: QueryDto) {
    return this.searchService.filterUsers(dto.search, user.id);
  }

  @Get('groups')
  groups(@Query() dto: QueryDto) {
    return this.searchService.filterGroupConversations(dto.search);
  }

  @Get()
  async index(@CurrentUser() user: UserEntity, @Query() dto: QueryDto) {
    const users = await this.searchService.filterUsers(dto.search, user.id);
    const groups = await this.searchService.filterGroupConversations(
      dto.search,
    );

    return { users, groups };
  }
}
