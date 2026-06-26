import { Module } from '@nestjs/common';
import { WorkflowFoundationController } from './workflow-foundation.controller.js';
import { WorkflowFoundationService } from './workflow-foundation.service.js';

@Module({
  controllers: [WorkflowFoundationController],
  providers: [WorkflowFoundationService]
})
export class WorkflowFoundationModule {}
