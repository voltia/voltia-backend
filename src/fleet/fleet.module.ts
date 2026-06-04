import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FleetController } from './fleet.controller';
import { FleetService } from './fleet.service';
import { Family } from './entities/family.entity';
import { FamilyMember } from './entities/family-member.entity';
import { Device } from './entities/device.entity';
import { Vehicle } from './entities/vehicle.entity';
import { DeviceLocation } from './entities/device-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Family,
      FamilyMember,
      Device,
      Vehicle,
      DeviceLocation,
    ]),
  ],
  controllers: [FleetController],
  providers: [FleetService],
  exports: [FleetService],
})
export class FleetModule {}