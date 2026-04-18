import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SosModule } from './sos/sos.module';
import { EventEntity } from './sos/event.entity';
import { MapModule } from './map/map.module';
import { PlaceSubmission } from './map/entities/place-submission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Voltia1234',
      database: 'postgres',
      entities: [EventEntity, PlaceSubmission],
      synchronize: true,
    }),
    SosModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}