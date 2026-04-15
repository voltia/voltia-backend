import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SosModule } from './sos/sos.module';
import { EventEntity } from './sos/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // ← tu contraseña real
      database: 'voltia',
      entities: [EventEntity],
      synchronize: true, // solo en desarrollo
    }),
    SosModule,
  ],
})
export class AppModule {}