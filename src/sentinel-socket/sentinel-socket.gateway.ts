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

  constructor() {
    console.log('🛰️ VOLTIA REALTIME SOCKET MODULE LOADED');
  }

  afterInit(server: Server) {
    console.log('🛰️ VOLTIA REALTIME SOCKET ACTIVE');
  }

  handleConnection(client: Socket) {
    console.log(`🟢 Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('security-event')
  handleSecurityEvent(@MessageBody() data: any) {
    const payload = {
      event: 'CRITICAL_SECURITY_EVENT',
      risk: data.risk || 'LOW',
      action: data.action || 'ALLOW',
      device: data.device || 'UNKNOWN',
      timestamp: new Date().toISOString(),
      engine: 'VOLTIA_SENTINEL_REALTIME_V1',
    };

    this.server.emit('sentinel-alert', payload);

    return {
      success: true,
      realtime: true,
      payload,
    };
  }
}