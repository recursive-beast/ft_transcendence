import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonService } from './common.service';
import { FileCleanupInterceptor } from './file-cleanup.interceptor';

@Module({
  providers: [
    CommonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FileCleanupInterceptor,
    },
  ],
  exports: [CommonService],
})
export class CommonModule {}
