import { Injectable } from '@nestjs/common';

@Injectable()
export class BehavioralAIService {
  analyze(data: any) {
    let score = 0;

    const reasons: string[] = [];

    if (data.typingSpeedAnomaly) {
      score += 50;
      reasons.push('Anomalía de escritura detectada');
    }

    if (data.gestureMismatch) {
      score += 60;
      reasons.push('Gestos inconsistentes');
    }

    if (data.voicePatternMismatch) {
      score += 70;
      reasons.push('Patrón de voz sospechoso');
    }

    if (data.navigationAnomaly) {
      score += 50;
      reasons.push('Navegación sospechosa');
    }

    if (data.botBehavior) {
      score += 80;
      reasons.push('Comportamiento tipo bot');
    }

    if (data.sleepPatternAnomaly) {
      score += 40;
      reasons.push('Patrón de uso anormal');
    }

    let level = 'LOW';
    let action = 'ALLOW';
    let trusted = true;

    if (score >= 250) {
      level = 'CRITICAL';
      action = 'STEALTH_LOCK';
      trusted = false;
    } else if (score >= 150) {
      level = 'HIGH';
      action = 'FREEZE';
      trusted = false;
    } else if (score >= 80) {
      level = 'MEDIUM';
      action = 'VERIFY_USER';
    }

    return {
      success: true,
      analysis: {
        score,
        level,
        action,
        trusted,
        reasons,
        ai: {
          engine: 'VOLTIA_BEHAVIORAL_AI_V1',
          realtime: true,
          antiBot: true,
          adaptive: true,
        },
      },
    };
  }
}