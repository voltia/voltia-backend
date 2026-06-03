export class RegisterDeviceDto {
  ownerId!: string;
  familyId?: string;
  name!: string;
  deviceType!: 'PHONE' | 'TABLET' | 'WATCH' | 'GPS_TRACKER' | 'VEHICLE_DEVICE' | 'IOT';
  platform!: 'IOS' | 'ANDROID' | 'WEB' | 'GPS' | 'UNKNOWN';
  fingerprint!: string;
}