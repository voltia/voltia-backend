import { Module } from '@nestjs/common';
import { BehavioralAIController } from './behavioral-ai.controller';
import { BehavioralAIService } from './behavioral-ai.service';

@Module({
  controllers: [BehavioralAIController],
  providers: [BehavioralAIService],
})
export class BehavioralAIModule {}