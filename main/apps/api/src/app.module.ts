import { Module } from '@nestjs/common';
import { DataFoundationModule } from './data-foundation/data-foundation.module.js';
import { FoundationModule } from './foundation/foundation.module.js';
import { WorkflowFoundationModule } from './workflow-foundation/workflow-foundation.module.js';
import { BusinessFoundationModule } from './business-foundation/business-foundation.module.js';
import { IntegrityFoundationModule } from './integrity-foundation/integrity-foundation.module.js';

@Module({ imports: [FoundationModule, DataFoundationModule, WorkflowFoundationModule, BusinessFoundationModule, IntegrityFoundationModule] })
export class AppModule {}

