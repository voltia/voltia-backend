import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post('submit-place')
  submitPlace(@Body() body: any) {
    return this.mapService.submitPlace(body);
  }

  @Get('places')
  getPlaces() {
    return this.mapService.getPlaces();
  }

  @Patch('approve/:id')
  approvePlace(@Param('id') id: string) {
    return this.mapService.approvePlace(Number(id));
  }

  @Patch('reject/:id')
  rejectPlace(@Param('id') id: string) {
    return this.mapService.rejectPlace(Number(id));
  }

  @Delete('place/:id')
  deletePlace(@Param('id') id: string) {
    return this.mapService.deletePlace(Number(id));
  }
}