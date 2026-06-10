import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SosController } from './sos.controller';
import { SosService } from './sos.service';
import { EventEntity } from './event.entity';
import { MapModule } from '../map/map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    MapModule,
  ],
  controllers: [SosController],
  providers: [SosService],
  exports: [SosService],
})
export class SosModule {}