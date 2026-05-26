import { Module } from '@nestjs/common';
import { SentinelSocketModule } from '../sentinel-socket/sentinel-socket.module';
import { RealtimeOrchestratorService } from './realtime-orchestrator.service';

@Module({
  imports: [SentinelSocketModule],
  providers: [RealtimeOrchestratorService],
  exports: [RealtimeOrchestratorService],
})
export class RealtimeOrchestratorModule {}