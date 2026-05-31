import { Module } from '@nestjs/common';
import { CentralAIController } from './central-ai.controller';
import { CentralAIService } from './central-ai.service';
import { RealtimeOrchestratorModule } from '../realtime-orchestrator/realtime-orchestrator.module';

@Module({
  imports: [RealtimeOrchestratorModule],
  controllers: [CentralAIController],
  providers: [CentralAIService],
  exports: [CentralAIService],
})
export class CentralAIModule {}