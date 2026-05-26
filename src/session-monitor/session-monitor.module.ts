import { Module } from '@nestjs/common';
import { SessionMonitorController } from './session-monitor.controller';
import { SessionMonitorService } from './session-monitor.service';

@Module({
  controllers: [SessionMonitorController],
  providers: [SessionMonitorService],
  exports: [SessionMonitorService],
})
export class SessionMonitorModule {}