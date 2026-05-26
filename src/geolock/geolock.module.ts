import { Module } from '@nestjs/common';
import { GeoLockController } from './geolock.controller';
import { GeoLockService } from './geolock.service';

@Module({
  controllers: [GeoLockController],
  providers: [GeoLockService],
})
export class GeoLockModule {}