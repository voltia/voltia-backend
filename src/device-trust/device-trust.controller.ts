import { Body, Controller, Post } from '@nestjs/common';
import { DeviceTrustService } from './device-trust.service';

@Controller('device-trust')
export class DeviceTrustController {
  constructor(private readonly deviceTrustService: DeviceTrustService) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return {
      success: true,
      analysis: this.deviceTrustService.analyze(body),
    };
  }
}