import { Controller, Get, Query } from '@nestjs/common';
import { QueryDto } from './dto/query';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('users')
  users(@Query() dto: QueryDto) {
    return this.searchService.filterUsers(dto.search);
  }

  @Get('groups')
  groups(@Query() dto: QueryDto) {
    return this.searchService.filterGroupConversations(dto.search);
  }

  @Get()
  async index(@Query() dto: QueryDto) {
    const users = await this.searchService.filterUsers(dto.search);
    const groups = await this.searchService.filterGroupConversations(
      dto.search,
    );

    return { users, groups };
  }
}
