import { Module } from '@nestjs/common';
import { DataFoundationController } from './data-foundation.controller.js';
import { DataFoundationService } from './data-foundation.service.js';

@Module({
  controllers: [DataFoundationController],
  providers: [DataFoundationService]
})
export class DataFoundationModule {}
