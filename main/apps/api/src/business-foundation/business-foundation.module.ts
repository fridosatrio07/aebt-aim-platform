import { Module } from '@nestjs/common';
import { BusinessFoundationController } from './business-foundation.controller.js';
import { BusinessFoundationService } from './business-foundation.service.js';

@Module({
  controllers: [BusinessFoundationController],
  providers: [BusinessFoundationService]
})
export class BusinessFoundationModule {}
