import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import {
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { MapModule } from './map/map.module';

import { SecurityModule } from './security/security.module';
import { SecurityMiddleware } from './security/middleware/security.middleware';

import { IntegrityModule } from './integrity/integrity.module';
import { FingerprintModule } from './fingerprint/fingerprint.module';
import { DeviceTrustModule } from './device-trust/device-trust.module';
import { SessionMonitorModule } from './session-monitor/session-monitor.module';
import { GeoLockModule } from './geolock/geolock.module';

import { ThreatAIModule } from './threat-ai/threat-ai.module';
import { BehavioralAIModule } from './behavioral-ai/behavioral-ai.module';
import { ShadowModeModule } from './shadow-mode/shadow-mode.module';
import { TacticalResponseModule } from './tactical-response/tactical-response.module';
import { CentralAIModule } from './central-ai/central-ai.module';

import { SentinelSocketModule } from './sentinel-socket/sentinel-socket.module';
import { RealtimeOrchestratorModule } from './realtime-orchestrator/realtime-orchestrator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),

    AuthModule,
    MapModule,
    SecurityModule,
    IntegrityModule,
    FingerprintModule,
    DeviceTrustModule,
    SessionMonitorModule,
    GeoLockModule,
    ThreatAIModule,
    BehavioralAIModule,
    ShadowModeModule,
    TacticalResponseModule,
    CentralAIModule,
    SentinelSocketModule,
    RealtimeOrchestratorModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
  }
}