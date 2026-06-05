import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RegisterVehicleDto } from './dto/register-vehicle.dto';

@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Post('family/create')
  createFamily(@Body() body: CreateFamilyDto) {
    return this.fleetService.createFamily(body);
  }

  @Post('device/register')
  registerDevice(@Body() body: RegisterDeviceDto) {
    return this.fleetService.registerDevice(body);
  }

  @Post('vehicle/register')
  registerVehicle(@Body() body: RegisterVehicleDto) {
    return this.fleetService.registerVehicle(body);
  }

  @Get('family/:familyId')
  getFamilyOverview(@Param('familyId') familyId: string) {
    return this.fleetService.getFamilyOverview(familyId);
  }

  @Post('location/update')
  updateDeviceLocation(@Body() body: any) {
    return this.fleetService.updateDeviceLocation(body);
  }

  @Get('location/history/:deviceId')
  getDeviceLocationHistory(@Param('deviceId') deviceId: string) {
    return this.fleetService.getDeviceLocationHistory(deviceId);
  }

  @Get('family/:familyId/locations')
  getFamilyLocations(@Param('familyId') familyId: string) {
    return this.fleetService.getFamilyLocations(familyId);
  }
}