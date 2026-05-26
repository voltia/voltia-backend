import { Body, Controller, Post } from '@nestjs/common';
import { DeviceRiskService } from './device-risk.service';

@Controller('integrity')
export class IntegrityController {
  constructor(
    private readonly deviceRiskService: DeviceRiskService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    const result =
      this.deviceRiskService.calculateRisk(body);

    return {
      success: true,
      analysis: result,
    };
  }
}