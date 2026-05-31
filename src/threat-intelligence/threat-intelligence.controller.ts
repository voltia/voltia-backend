import { Body, Controller, Post } from '@nestjs/common';
import { ThreatIntelligenceService } from './threat-intelligence.service';

@Controller('threat-intelligence')
export class ThreatIntelligenceController {
  constructor(
    private readonly threatIntelligenceService: ThreatIntelligenceService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.threatIntelligenceService.analyze(body);
  }
}