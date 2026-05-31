import { Injectable } from '@nestjs/common';
import { RealtimeOrchestratorService } from '../realtime-orchestrator/realtime-orchestrator.service';

@Injectable()
export class ThreatIntelligenceService {
  constructor(
    private readonly realtimeOrchestrator: RealtimeOrchestratorService,
  ) {}

  analyze(data: any) {
    const reasons: string[] = [];
    let score = 0;

    if (data.integrityRisk) {
      score += 120;
      reasons.push('Integrity Risk');
    }

    if (data.deviceRisk) {
      score += 100;
      reasons.push('Device Risk');
    }

    if (data.geoRisk) {
      score += 120;
      reasons.push('Geo Risk');
    }

    if (data.sessionRisk) {
      score += 100;
      reasons.push('Session Risk');
    }

    if (data.behaviorRisk) {
      score += 150;
      reasons.push('Behavioral AI Risk');
    }

    if (data.threatRisk) {
      score += 200;
      reasons.push('Threat AI Risk');
    }

    if (data.clusterRisk) {
      score += 180;
      reasons.push('Suspicious Cluster Detected');
    }

    if (data.hostileProximity) {
      score += 200;
      reasons.push('Hostile Proximity Detected');
    }

    if (data.sosActive) {
      score += 180;
      reasons.push('SOS Active');
    }

    if ((data.unknownNearbyDevices || 0) >= 3) {
      score += 160;
      reasons.push('Multiple Unknown Nearby Devices');
    }

    let level = 'LOW';
    let recommendedAction = 'MONITOR';
    let riskRadiusMeters = 100;
    let heatLevel = 1;

    if (score >= 700) {
      level = 'CRITICAL';
      recommendedAction = 'SILENT_SOS_ISOLATION';
      riskRadiusMeters = 800;
      heatLevel = 5;
    } else if (score >= 450) {
      level = 'HIGH';
      recommendedAction = 'TACTICAL_RESPONSE';
      riskRadiusMeters = 500;
      heatLevel = 4;
    } else if (score >= 250) {
      level = 'MEDIUM';
      recommendedAction = 'SHADOW_MONITORING';
      riskRadiusMeters = 250;
      heatLevel = 3;
    }

    const result = {
      success: true,
      threatIntelligence: {
        score,
        level,
        heatLevel,
        riskRadiusMeters,
        recommendedAction,
        trusted: level === 'LOW',
        reasons,
        device: data.device || 'UNKNOWN_DEVICE',
        location: {
          lat: data.lat || 40.7128,
          lng: data.lng || -74.006,
        },
        engine: 'VOLTIA_SENTINEL_THREAT_INTELLIGENCE_V1',
        timestamp: new Date().toISOString(),
      },
    };

    if (level === 'HIGH' || level === 'CRITICAL') {
      this.realtimeOrchestrator.broadcastCriticalEvent({
        event: 'THREAT_INTELLIGENCE_EVENT',
        level,
        action: recommendedAction,
        device: data.device || 'UNKNOWN_DEVICE',
        score,
        heatLevel,
        riskRadiusMeters,
        reasons,
        lat: data.lat || 40.7128,
        lng: data.lng || -74.006,
        engine: 'VOLTIA_SENTINEL_THREAT_INTELLIGENCE_V1',
      });
    }

    return result;
  }
}