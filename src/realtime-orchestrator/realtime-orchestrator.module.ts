import { Module } from '@nestjs/common';
import { RealtimeOrchestratorService } from './realtime-orchestrator.service';

@Module({
  providers: [RealtimeOrchestratorService],
  exports: [RealtimeOrchestratorService],
})
export class RealtimeOrchestratorModule {}