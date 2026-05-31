import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BehavioralAIModule } from './behavioral-ai/behavioral-ai.module';
import { CentralAIModule } from './central-ai/central-ai.module';
import { DeviceTrustModule } from './device-trust/device-trust.module';
import { FingerprintModule } from './fingerprint/fingerprint.module';
import { GeoLockModule } from './geolock/geolock.module';
import { IntegrityModule } from './integrity/integrity.module';
import { RealtimeOrchestratorModule } from './realtime-orchestrator/realtime-orchestrator.module';
import { SecurityModule } from './security/security.module';
import { SentinelModule } from './sentinel/sentinel.module';
import { SentinelSocketModule } from './sentinel-socket/sentinel-socket.module';
import { SessionMonitorModule } from './session-monitor/session-monitor.module';
import { ShadowModeModule } from './shadow-mode/shadow-mode.module';
import { SosModule } from './sos/sos.module';
import { TacticalResponseModule } from './tactical-response/tactical-response.module';
import { ThreatAIModule } from './threat-ai/threat-ai.module';
import { ThreatIntelligenceModule } from './threat-intelligence/threat-intelligence.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'voltia-dev.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    BehavioralAIModule,
    CentralAIModule,
    DeviceTrustModule,
    FingerprintModule,
    GeoLockModule,
    IntegrityModule,
    RealtimeOrchestratorModule,
    SecurityModule,
    SentinelModule,
    SentinelSocketModule,
    SessionMonitorModule,
    ShadowModeModule,
    SosModule,
    TacticalResponseModule,
    ThreatAIModule,
    ThreatIntelligenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}