import { Injectable } from '@nestjs/common';

@Injectable()
export class RealtimeOrchestratorService {

  async broadcastCriticalEvent(data: any) {
    console.log('🚨 CRITICAL EVENT');
    console.log(data);

    return {
      success: true,
      realtime: true,
      dispatched: true,
      type: 'CRITICAL',
      payload: data,
    };
  }

  async broadcastSecurityEvent(data: any) {
    console.log('🛡️ SECURITY EVENT');
    console.log(data);

    return {
      success: true,
      realtime: true,
      dispatched: true,
      type: 'SECURITY',
      payload: data,
    };
  }
}