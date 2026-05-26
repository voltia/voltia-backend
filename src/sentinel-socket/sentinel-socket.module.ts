import { Module } from '@nestjs/common';
import { SentinelSocketGateway } from './sentinel-socket.gateway';

@Module({
  providers: [SentinelSocketGateway],
  exports: [SentinelSocketGateway],
})
export class SentinelSocketModule {}