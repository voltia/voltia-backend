import { Injectable } from '@nestjs/common';

@Injectable()
export class CentralAIService {
  analyze(data: any) {
    let score = 0;
    const reasons: string[] = [];

    if (data.integrityRisk) {
      score += 40;
      reasons.push('Integrity Engine reportó riesgo');
    }

    if (data.deviceRisk) {
      score += 50;
      reasons.push('Device Trust reportó riesgo');
    }

    if (data.geoRisk) {
      score += 60;
      reasons.push('GeoLock reportó riesgo');
    }

    if (data.sessionRisk) {
      score += 70;
      reasons.push('Session Monitor reportó riesgo');
    }

    if (data.threatRisk) {
      score += 80;
      reasons.push('Threat AI reportó riesgo');
    }

    if (data.behaviorRisk) {
      score += 90;
      reasons.push('Behavioral AI reportó riesgo');
    }

    if (data.shadowModeRequired) {
      score += 60;
      reasons.push('Shadow Mode requerido');
    }

    if (data.tacticalResponseRequired) {
      score += 80;
      reasons.push('Respuesta táctica requerida');
    }

    let level = 'LOW';
    let action = 'ALLOW';

    if (score >= 350) {
      level = 'CRITICAL';
      action = 'SOS_ESCALATION';
    } else if (score >= 280) {
      level = 'CRITICAL';
      action = 'LOCKDOWN';
    } else if (score >= 220) {
      level = 'HIGH';
      action = 'SHADOW_MODE';
    } else if (score >= 150) {
      level = 'HIGH';
      action = 'FREEZE';
    } else if (score >= 80) {
      level = 'MEDIUM';
      action = 'VERIFY';
    }

    return {
      success: true,
      centralAI: {
        score,
        level,
        action,
        trusted: score < 150,
        reasons,
        engine: 'VOLTIA_CENTRAL_AI_ORCHESTRATOR_V1',
        modules: {
          integrityRisk: !!data.integrityRisk,
          deviceRisk: !!data.deviceRisk,
          geoRisk: !!data.geoRisk,
          sessionRisk: !!data.sessionRisk,
          threatRisk: !!data.threatRisk,
          behaviorRisk: !!data.behaviorRisk,
          shadowModeRequired: !!data.shadowModeRequired,
          tacticalResponseRequired: !!data.tacticalResponseRequired,
        },
      },
    };
  }
}