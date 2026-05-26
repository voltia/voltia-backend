import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MapGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  afterInit() {
    console.log('VOLTIA WebSocket Gateway listo');
  }

  emitMapEvent(data: unknown) {
    this.server.emit('map_event', data);
  }
}