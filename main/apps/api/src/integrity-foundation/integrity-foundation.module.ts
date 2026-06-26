import { Module } from '@nestjs/common';
import { IntegrityFoundationController } from './integrity-foundation.controller.js';
import { IntegrityFoundationService } from './integrity-foundation.service.js';

@Module({
  controllers: [IntegrityFoundationController],
  providers: [IntegrityFoundationService]
})
export class IntegrityFoundationModule {}