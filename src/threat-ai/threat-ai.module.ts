import { Module } from '@nestjs/common';
import { ThreatAIController } from './threat-ai.controller';
import { ThreatAIService } from './threat-ai.service';
import { RealtimeOrchestratorModule } from '../realtime-orchestrator/realtime-orchestrator.module';

@Module({
  imports: [RealtimeOrchestratorModule],
  controllers: [ThreatAIController],
  providers: [ThreatAIService],
})
export class ThreatAIModule {}