import { Module } from '@nestjs/common';
import { IntegrityController } from './integrity.controller';
import { DeviceRiskService } from './device-risk.service';

@Module({
  controllers: [IntegrityController],
  providers: [DeviceRiskService],
})
export class IntegrityModule {}