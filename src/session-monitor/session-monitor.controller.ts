import { Body, Controller, Post } from '@nestjs/common';
import { SessionMonitorService } from './session-monitor.service';

@Controller('session-monitor')
export class SessionMonitorController {
  constructor(
    private readonly sessionMonitorService: SessionMonitorService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return {
      success: true,
      analysis: this.sessionMonitorService.analyze(body),
    };
  }
}