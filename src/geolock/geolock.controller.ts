import { Body, Controller, Post } from '@nestjs/common';
import { GeoLockService } from './geolock.service';

@Controller('geolock')
export class GeoLockController {
  constructor(private readonly geolockService: GeoLockService) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.geolockService.analyze(body);
  }
}