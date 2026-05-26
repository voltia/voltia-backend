import { Module } from '@nestjs/common';
import { ShadowModeController } from './shadow-mode.controller';
import { ShadowModeService } from './shadow-mode.service';

@Module({
  controllers: [ShadowModeController],
  providers: [ShadowModeService],
})
export class ShadowModeModule {}