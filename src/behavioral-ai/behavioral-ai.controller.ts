import { Body, Controller, Post } from '@nestjs/common';
import { BehavioralAIService } from './behavioral-ai.service';

@Controller('behavioral-ai')
export class BehavioralAIController {
  constructor(
    private readonly behavioralAIService: BehavioralAIService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.behavioralAIService.analyze(body);
  }
}