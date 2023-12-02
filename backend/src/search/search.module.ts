import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
