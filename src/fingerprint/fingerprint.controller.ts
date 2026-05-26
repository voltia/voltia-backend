import { Body, Controller, Post } from '@nestjs/common';
import { FingerprintService } from './fingerprint.service';

@Controller('fingerprint')
export class FingerprintController {
  constructor(private readonly fingerprintService: FingerprintService) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return {
      success: true,
      analysis: this.fingerprintService.analyze(body),
    };
  }
}