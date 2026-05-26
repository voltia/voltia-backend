import { Module } from '@nestjs/common';
import { CentralAIController } from './central-ai.controller';
import { CentralAIService } from './central-ai.service';

@Module({
  controllers: [CentralAIController],
  providers: [CentralAIService],
})
export class CentralAIModule {}