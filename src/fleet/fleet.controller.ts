import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RegisterVehicleDto } from './dto/register-vehicle.dto';

@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Post('families')
  createFamily(@Body() dto: CreateFamilyDto) {
    return this.fleetService.createFamily(dto);
  }

  @Post('devices')
  registerDevice(@Body() dto: RegisterDeviceDto) {
    return this.fleetService.registerDevice(dto);
  }

  @Post('vehicles')
  registerVehicle(@Body() dto: RegisterVehicleDto) {
    return this.fleetService.registerVehicle(dto);
  }

  @Get('families/:familyId/overview')
  getFamilyOverview(@Param('familyId') familyId: string) {
    return this.fleetService.getFamilyOverview(familyId);
  }
}