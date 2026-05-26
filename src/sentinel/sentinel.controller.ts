import { Body, Controller, Post } from '@nestjs/common';
import { SentinelService } from './sentinel.service';

@Controller('sentinel')
export class SentinelController {
  constructor(private readonly sentinelService: SentinelService) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return {
      success: true,
      analysis: this.sentinelService.analyze(body),
    };
  }
}