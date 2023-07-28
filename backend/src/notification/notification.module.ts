import { Module } from '@nestjs/common';
import { CustomPrismaModule, PrismaModule } from 'nestjs-prisma';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';

@Module({
  imports: [PrismaModule, CustomPrismaModule],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
})
export class NotificationModule {}
