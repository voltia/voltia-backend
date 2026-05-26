import { Injectable } from '@nestjs/common';
import { RealtimeOrchestratorService } from '../realtime-orchestrator/realtime-orchestrator.service';

@Injectable()
export class ThreatAIService {
  constructor(
    private readonly realtimeOrchestrator: RealtimeOrchestratorService,
  ) {}

  analyze(data: any) {
    let score = 0;
    const reasons: string[] = [];

    if (data.integrityRisk) {
      score += 40;
      reasons.push('Integrity Risk');
    }

    if (data.deviceRisk) {
      score += 50;
      reasons.push('Device Risk');
    }

    if (data.geoRisk) {
      score += 60;
      reasons.push('Geo Risk');
    }

    if (data.sessionRisk) {
      score += 70;
      reasons.push('Session Risk');
    }

    if (data.fingerprintMismatch) {
      score += 80;
      reasons.push('Fingerprint Mismatch');
    }

    if (data.botBehavior) {
      score += 100;
      reasons.push('Bot Behavior Detected');
    }

    let level = 'LOW';
    let action = 'ALLOW';

    if (score >= 250) {
      level = 'CRITICAL';
      action = 'LOCKDOWN';
    } else if (score >= 180) {
      level = 'HIGH';
      action = 'FREEZE';
    } else if (score >= 100) {
      level = 'MEDIUM';
      action = 'VERIFY';
    }

    if (data.geoRisk && data.sessionRisk && data.fingerprintMismatch) {
      reasons.push('Critical correlation: Geo + Session + Fingerprint');
      level = 'CRITICAL';
      action = 'SHADOW_MODE';
    }

    const result = {
      success: true,
      analysis: {
        score,
        level,
        action,
        trusted: score < 100,
        reasons,
        ai: {
          engine: 'VOLTIA_THREAT_AI_V1',
          realtime: true,
          adaptive: true,
        },
      },
    };

    if (level === 'HIGH' || level === 'CRITICAL') {
      this.realtimeOrchestrator.broadcastSecurityEvent({
        engine: 'VOLTIA_THREAT_AI_V1',
        level,
        action,
        device: data.device || 'UNKNOWN_DEVICE',
        metadata: {
          score,
          reasons,
          source: 'threat-ai/analyze',
        },
      });
    }

    return result;
  }
}