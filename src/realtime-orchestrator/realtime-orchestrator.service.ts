import { Injectable } from '@nestjs/common';
import { SentinelSocketGateway } from '../sentinel-socket/sentinel-socket.gateway';

@Injectable()
export class RealtimeOrchestratorService {
  constructor(
    private readonly sentinelGateway: SentinelSocketGateway,
  ) {}

  broadcastSecurityEvent(data: any) {
    const payload = {
      type: 'SECURITY_EVENT',
      engine: data.engine || 'UNKNOWN_ENGINE',
      level: data.level || 'LOW',
      action: data.action || 'NONE',
      device: data.device || 'UNKNOWN_DEVICE',
      timestamp: new Date().toISOString(),
      metadata: data.metadata || {},
    };

    console.log('📡 BROADCASTING SECURITY EVENT');
    console.log(payload);

    this.sentinelGateway.server.emit(
      'sentinel-alert',
      payload,
    );

    return {
      success: true,
      realtime: true,
      payload,
    };
  }
}