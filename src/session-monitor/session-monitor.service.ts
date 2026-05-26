import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionMonitorService {
  analyze(data: any) {
    let score = 0;
    const reasons: string[] = [];

    if (data.ipChanged) {
      score += 25;
      reasons.push('Cambio de IP detectado');
    }

    if (data.countryChanged) {
      score += 35;
      reasons.push('Cambio de país detectado');
    }

    if (data.gpsJump) {
      score += 35;
      reasons.push('Salto GPS sospechoso');
    }

    if (data.tokenReplay) {
      score += 50;
      reasons.push('Token replay detectado');
    }

    if (data.duplicateSession) {
      score += 45;
      reasons.push('Sesión duplicada detectada');
    }

    if (data.zombieSession) {
      score += 40;
      reasons.push('Sesión zombie detectada');
    }

    if (data.impossibleSpeed) {
      score += 35;
      reasons.push('Velocidad imposible detectada');
    }

    let level = 'LOW';
    let action = 'ALLOW';

    if (score >= 120) {
      level = 'CRITICAL';
      action = 'LOCKDOWN';
    } else if (score >= 80) {
      level = 'HIGH';
      action = 'FREEZE_SESSION';
    } else if (score >= 40) {
      level = 'MEDIUM';
      action = 'REQUIRE_REAUTH';
    }

    return {
      score,
      level,
      action,
      trusted: score < 80,
      reasons,
      monitor: {
        realtime: true,
        engine: 'VOLTIA_SESSION_MONITOR_V1',
      },
    };
  }
}