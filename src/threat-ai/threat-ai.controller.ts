import { Body, Controller, Post } from '@nestjs/common';
import { ThreatAIService } from './threat-ai.service';

@Controller('threat-ai')
export class ThreatAIController {
  constructor(
    private readonly threatAIService: ThreatAIService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.threatAIService.analyze(body);
  }
}