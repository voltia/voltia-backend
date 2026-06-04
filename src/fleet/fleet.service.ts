import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Family } from './entities/family.entity';
import { FamilyMember } from './entities/family-member.entity';
import { Device } from './entities/device.entity';
import { Vehicle } from './entities/vehicle.entity';

import { CreateFamilyDto } from './dto/create-family.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RegisterVehicleDto } from './dto/register-vehicle.dto';

import { DeviceLocation } from './entities/device-location.entity';

@Injectable()
export class FleetService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepo: Repository<Family>,

    @InjectRepository(FamilyMember)
    private readonly memberRepo: Repository<FamilyMember>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(Vehicle)
private readonly vehicleRepo: Repository<Vehicle>,

@InjectRepository(DeviceLocation)
private readonly locationRepo: Repository<DeviceLocation>,
) {}

  async createFamily(dto: CreateFamilyDto) {
    const family = new Family();
    family.name = dto.name;
    family.ownerId = dto.ownerId;
    family.status = 'ACTIVE';

    const savedFamily = await this.familyRepo.save(family);

    const ownerMember = new FamilyMember();
    ownerMember.familyId = savedFamily.id;
    ownerMember.userId = dto.ownerId;
    ownerMember.role = 'OWNER';
    ownerMember.canShareLocation = true;
    ownerMember.canReceiveAlerts = true;
    ownerMember.canManageDevices = true;
    ownerMember.status = 'ACTIVE';

    await this.memberRepo.save(ownerMember);

    return {
      ok: true,
      family: savedFamily,
    };
  }

  async registerDevice(dto: RegisterDeviceDto) {
    const existing = await this.deviceRepo.findOne({
      where: { fingerprint: dto.fingerprint },
    });

    if (existing) {
      existing.ownerId = dto.ownerId;
      existing.familyId = dto.familyId ?? existing.familyId;
      existing.name = dto.name;
      existing.deviceType = dto.deviceType;
      existing.platform = dto.platform;
      existing.active = true;
      existing.status = 'ONLINE';
      existing.lastSeenAt = new Date();

      return {
        ok: true,
        device: await this.deviceRepo.save(existing),
        reused: true,
      };
    }

    const device = new Device();
    device.ownerId = dto.ownerId;
    device.familyId = dto.familyId ?? '';
    device.name = dto.name;
    device.deviceType = dto.deviceType;
    device.platform = dto.platform;
    device.fingerprint = dto.fingerprint;
    device.trustScore = 100;
    device.status = 'ONLINE';
    device.active = true;
    device.lastSeenAt = new Date();

    return {
      ok: true,
      device: await this.deviceRepo.save(device),
      reused: false,
    };
  }

  async registerVehicle(dto: RegisterVehicleDto) {
    const vehicle = new Vehicle();
    vehicle.ownerId = dto.ownerId;
    vehicle.familyId = dto.familyId ?? '';
    vehicle.nickname = dto.nickname;
    vehicle.plate = dto.plate ?? '';
    vehicle.brand = dto.brand ?? '';
    vehicle.model = dto.model ?? '';
    vehicle.year = dto.year ?? 0;
    vehicle.linkedDeviceId = dto.linkedDeviceId ?? '';
    vehicle.status = 'ACTIVE';

    return {
      ok: true,
      vehicle: await this.vehicleRepo.save(vehicle),
    };
  }

  async getFamilyOverview(familyId: string) {
    const family = await this.familyRepo.findOne({
      where: { id: familyId },
    });

    if (!family) {
      throw new BadRequestException('Familia no encontrada');
    }

    const members = await this.memberRepo.find({ where: { familyId } });
    const devices = await this.deviceRepo.find({ where: { familyId } });
    const vehicles = await this.vehicleRepo.find({ where: { familyId } });

    const onlineDevices = devices.filter(
      (d) => d.status === 'ONLINE' || d.status === 'MOVING',
    ).length;

    const avgTrust =
      devices.length === 0
        ? 100
        : Math.round(
            devices.reduce((sum, d) => sum + d.trustScore, 0) /
              devices.length,
          );

    return {
      ok: true,
      family,
      stats: {
        members: members.length,
        devices: devices.length,
        vehicles: vehicles.length,
        onlineDevices,
        averageTrustScore: avgTrust,
      },
      members,
      devices,
      vehicles,
    };
  }
async updateDeviceLocation(data: {
  deviceId: string;
  familyId?: string;
  userId?: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  battery?: number;
  eventType?: 'NORMAL' | 'SOS' | 'ALERT' | 'GEOFENCE' | 'OFFLINE_SYNC';
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}) {
  const device = await this.deviceRepo.findOne({
  where: [
    { id: data.deviceId },
    { fingerprint: data.deviceId },
  ],
});

  if (!device) {
    throw new BadRequestException('Dispositivo no encontrado');
  }

  device.latitude = data.latitude;
  device.longitude = data.longitude;
  device.speed = data.speed ?? device.speed;
  device.heading = data.heading ?? device.heading;
  device.lastSeenAt = new Date();
  device.status = data.eventType === 'SOS' ? 'SOS' : 'MOVING';

  await this.deviceRepo.save(device);

  const location = new DeviceLocation();

  location.deviceId = data.deviceId;
  location.familyId = data.familyId ?? device.familyId;
  location.userId = data.userId ?? device.ownerId;
  location.latitude = data.latitude;
  location.longitude = data.longitude;
  location.speed = data.speed ?? 0;
  location.heading = data.heading ?? 0;
  location.accuracy = data.accuracy ?? 0;
  location.battery = data.battery ?? null;
  location.eventType = data.eventType ?? 'NORMAL';
  location.riskLevel = data.riskLevel ?? 'LOW';

  const savedLocation = await this.locationRepo.save(location);

  return {
    ok: true,
    device,
    location: savedLocation,
  };
}

async getDeviceLocationHistory(deviceId: string) {
  const locations = await this.locationRepo.find({
    where: { deviceId },
    order: { createdAt: 'DESC' },
    take: 100,
  });

return {
  ok: true,
  deviceId,
  total: locations.length,
  locations,
};
}

}