import { Injectable } from '@nestjs/common';

@Injectable()
export class GeoLockService {
  analyze(data: any) {
    let score = 0;

    const reasons: string[] = [];

    if (data.countryBlocked) {
      score += 100;
      reasons.push('País bloqueado detectado');
    }

    if (data.impossibleTravel) {
      score += 60;
      reasons.push('Viaje imposible detectado');
    }

    if (data.locationMismatch) {
      score += 40;
      reasons.push('Ubicación inconsistente');
    }

    if (data.highRiskZone) {
      score += 50;
      reasons.push('Zona de alto riesgo detectada');
    }

    if (data.gpsSpoofing) {
      score += 70;
      reasons.push('GPS Spoofing detectado');
    }

    let level = 'LOW';
    let action = 'ALLOW';

    if (score >= 80) {
      level = 'CRITICAL';
      action = 'LOCK_GEO_ACCESS';
    } else if (score >= 40) {
      level = 'HIGH';
      action = 'VERIFY_LOCATION';
    }

    return {
      success: true,
      analysis: {
        score,
        level,
        action,
        trusted: score < 40,
        reasons,
        protection: {
          engine: 'VOLTIA_GEOLOCK_V1',
          realtime: true,
        },
      },
    };
  }
}