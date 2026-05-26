import { Module } from '@nestjs/common';
import { TacticalResponseController } from './tactical-response.controller';
import { TacticalResponseService } from './tactical-response.service';

@Module({
  controllers: [TacticalResponseController],
  providers: [TacticalResponseService],
})
export class TacticalResponseModule {}