import { Module } from '@nestjs/common';

import { ThreatIntelligenceController } from './threat-intelligence.controller';
import { ThreatIntelligenceService } from './threat-intelligence.service';
import { RealtimeOrchestratorModule } from '../realtime-orchestrator/realtime-orchestrator.module';

@Module({
  imports: [RealtimeOrchestratorModule],
  controllers: [ThreatIntelligenceController],
  providers: [ThreatIntelligenceService],
  exports: [ThreatIntelligenceService],
})
export class ThreatIntelligenceModule {}