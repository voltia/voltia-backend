import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

type DeviceType = 'ANDROID' | 'IPHONE' | 'VEHICLE' | 'WATCH' | 'TABLET' | 'GPS_EXTERNAL' | 'UNKNOWN';
type MembershipLevel = 'PREMIUM' | 'ELITE' | 'GLOBAL';

interface VoltiaDeviceState {
  socketId: string;
  familyId: string;
  userId: string;
  memberName: string;
  deviceId: string;
  deviceType: DeviceType;
  membership: MembershipLevel;
  battery: number;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  threatScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  sosActive: boolean;
  online: boolean;
  lastSeen: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SentinelSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly devices = new Map<string, VoltiaDeviceState>();

  constructor() {
    console.log('⚡ VOLTIA REALTIME SOCKET MODULE LOADED');
  }

  afterInit(server: Server) {
    console.log('⚡ VOLTIA REALTIME SOCKET ACTIVE');
  }

  handleConnection(client: Socket) {
    console.log(`🟢 Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Cliente desconectado: ${client.id}`);

    for (const [deviceId, device] of this.devices.entries()) {
      if (device.socketId === client.id) {
        device.online = false;
        device.lastSeen = new Date().toISOString();

        this.server.emit('device-offline', {
          event: 'DEVICE_OFFLINE',
          deviceId,
          familyId: device.familyId,
          userId: device.userId,
          memberName: device.memberName,
          timestamp: device.lastSeen,
        });
      }
    }
  }

  @SubscribeMessage('device-register')
  handleDeviceRegister(@MessageBody() data: any) {
    const device: VoltiaDeviceState = {
      socketId: data.socketId || 'UNKNOWN_SOCKET',
      familyId: data.familyId || 'FAMILY-001',
      userId: data.userId || 'USER-001',
      memberName: data.memberName || 'Socio VOLTIA',
      deviceId: data.deviceId || 'DEVICE-UNKNOWN',
      deviceType: data.deviceType || 'UNKNOWN',
      membership: data.membership || 'PREMIUM',
      battery: Number(data.battery ?? 100),
      lat: Number(data.lat ?? 0),
      lng: Number(data.lng ?? 0),
      speed: Number(data.speed ?? 0),
      heading: Number(data.heading ?? 0),
      threatScore: Number(data.threatScore ?? 0),
      riskLevel: data.riskLevel || 'LOW',
      sosActive: Boolean(data.sosActive ?? false),
      online: true,
      lastSeen: new Date().toISOString(),
    };

    this.devices.set(device.deviceId, device);

    const payload = {
      event: 'DEVICE_REGISTERED',
      realtime: true,
      engine: 'VOLTIA_SENTINEL_MULTI_DEVICE_V2',
      device,
      totalDevices: this.devices.size,
    };

    this.server.emit('device-registered', payload);
    this.server.emit('family-devices-update', this.getDevicesArray());

    return {
      success: true,
      message: 'Dispositivo registrado en Sentinel Multi-Device',
      payload,
    };
  }

  @SubscribeMessage('device-location-update')
  handleDeviceLocationUpdate(@MessageBody() data: any) {
    const deviceId = data.deviceId || 'DEVICE-UNKNOWN';
    const existing = this.devices.get(deviceId);

    const updated: VoltiaDeviceState = {
      socketId: existing?.socketId || data.socketId || 'UNKNOWN_SOCKET',
      familyId: data.familyId || existing?.familyId || 'FAMILY-001',
      userId: data.userId || existing?.userId || 'USER-001',
      memberName: data.memberName || existing?.memberName || 'Socio VOLTIA',
      deviceId,
      deviceType: data.deviceType || existing?.deviceType || 'UNKNOWN',
      membership: data.membership || existing?.membership || 'PREMIUM',
      battery: Number(data.battery ?? existing?.battery ?? 100),
      lat: Number(data.lat ?? existing?.lat ?? 0),
      lng: Number(data.lng ?? existing?.lng ?? 0),
      speed: Number(data.speed ?? existing?.speed ?? 0),
      heading: Number(data.heading ?? existing?.heading ?? 0),
      threatScore: Number(data.threatScore ?? existing?.threatScore ?? 0),
      riskLevel: this.calculateRiskLevel(Number(data.threatScore ?? existing?.threatScore ?? 0)),
      sosActive: Boolean(data.sosActive ?? existing?.sosActive ?? false),
      online: true,
      lastSeen: new Date().toISOString(),
    };

    this.devices.set(deviceId, updated);

    const payload = {
      event: 'DEVICE_LOCATION_UPDATE',
      realtime: true,
      engine: 'VOLTIA_SENTINEL_MULTI_DEVICE_V2',
      device: updated,
      totalDevices: this.devices.size,
    };

    this.server.emit('device-location-update', payload);
    this.server.emit('family-devices-update', this.getDevicesArray());

    return {
      success: true,
      payload,
    };
  }

  @SubscribeMessage('security-event')
  handleSecurityEvent(@MessageBody() data: any) {
    const payload = {
      event: 'CRITICAL_SECURITY_EVENT',
      risk: data.risk || 'LOW',
      action: data.action || 'ALLOW',
      device: data.device || data.deviceId || 'UNKNOWN',
      familyId: data.familyId || 'FAMILY-001',
      userId: data.userId || 'USER-001',
      memberName: data.memberName || 'Socio VOLTIA',
      timestamp: new Date().toISOString(),
      engine: 'VOLTIA_SENTINEL_REALTIME_V2',
    };

    this.server.emit('sentinel-alert', payload);

    return {
      success: true,
      realtime: true,
      payload,
    };
  }

  @SubscribeMessage('sos-activate')
  handleSosActivate(@MessageBody() data: any) {
    const deviceId = data.deviceId || 'DEVICE-UNKNOWN';
    const device = this.devices.get(deviceId);

    if (device) {
      device.sosActive = true;
      device.threatScore = Math.max(device.threatScore, 95);
      device.riskLevel = 'HIGH';
      device.lastSeen = new Date().toISOString();
      this.devices.set(deviceId, device);
    }

    const payload = {
      event: 'SOS_ACTIVE',
      realtime: true,
      engine: 'VOLTIA_SENTINEL_SOS_MULTI_DEVICE_V2',
      deviceId,
      familyId: data.familyId || device?.familyId || 'FAMILY-001',
      userId: data.userId || device?.userId || 'USER-001',
      memberName: data.memberName || device?.memberName || 'Socio VOLTIA',
      lat: data.lat ?? device?.lat ?? 0,
      lng: data.lng ?? device?.lng ?? 0,
      timestamp: new Date().toISOString(),
    };

    this.server.emit('sos-active', payload);
    this.server.emit('family-devices-update', this.getDevicesArray());

    return {
      success: true,
      payload,
    };
  }

  @SubscribeMessage('get-family-devices')
  handleGetFamilyDevices() {
    return {
      success: true,
      realtime: true,
      engine: 'VOLTIA_SENTINEL_MULTI_DEVICE_V2',
      totalDevices: this.devices.size,
      devices: this.getDevicesArray(),
    };
  }

  private getDevicesArray() {
    return Array.from(this.devices.values());
  }

  private calculateRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (score >= 120) return 'CRITICAL';
    if (score >= 80) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  }
}