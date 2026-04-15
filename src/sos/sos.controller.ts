import { Controller, Post, Body, Get } from '@nestjs/common';
import { SosService } from './sos.service';

@Controller('sos')
export class SosController {
  constructor(private readonly sosService: SosService) {}

  @Post('activate')
  create(@Body() data: any) {
    return this.sosService.createEvent(data);
  }

  @Get('events')
  getAll() {
    return this.sosService.getAllEvents();
  }

  @Post('cancel')
  cancel(@Body() body: any) {
    return this.sosService.cancelEvent(body.userId);
  }

  @Post('status')
  status(@Body() body: any) {
    return this.sosService.getStatus(body.userId);
  }
}