import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
