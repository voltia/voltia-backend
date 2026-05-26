import { Body, Controller, Post } from '@nestjs/common';
import { CentralAIService } from './central-ai.service';

@Controller('central-ai')
export class CentralAIController {
  constructor(private readonly centralAIService: CentralAIService) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.centralAIService.analyze(body);
  }
}