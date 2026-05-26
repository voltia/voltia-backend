import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MapService } from './map.service';

@UseGuards(JwtAuthGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('markers')
  getMarkers() {
    return this.mapService.getMarkers();
  }

  @Get('places')
  getPlaces() {
    return this.mapService.getPlaces();
  }

  @Post('places/:id/approve')
  approvePlace(@Param('id') id: string) {
    return this.mapService.approvePlace(Number(id));
  }

  @Post('places/:id/reject')
  rejectPlace(@Param('id') id: string) {
    return this.mapService.rejectPlace(Number(id));
  }

  @Delete('places/:id')
  deletePlace(@Param('id') id: string) {
    return this.mapService.deletePlace(Number(id));
  }
}