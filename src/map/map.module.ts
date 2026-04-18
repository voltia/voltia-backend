import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PlaceSubmission } from './entities/place-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceSubmission])],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}