export class RegisterVehicleDto {
  ownerId!: string;
  familyId?: string;
  nickname!: string;
  plate?: string;
  brand?: string;
  model?: string;
  year?: number;
  linkedDeviceId?: string;
}