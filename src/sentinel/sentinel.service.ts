import { Injectable } from '@nestjs/common';

@Injectable()
export class SentinelService {
  analyze(data: any) {
    let score = 0;
    const reasons: string[] = [];

    if (data.vpnDetected) {
      score += 15;
      reasons.push('VPN detectado');
    }

    if (data.proxyDetected) {
      score += 20;
      reasons.push('Proxy detectado');
    }

    if (data.deviceChanged) {
      score += 30;
      reasons.push('Cambio de dispositivo');
    }

    if (data.simChanged) {
      score += 35;
      reasons.push('Cambio de SIM');
    }

    if (data.impossibleTravel) {
      score += 45;
      reasons.push('Viaje imposible detectado');
    }

    if (data.sessionHijackSuspected) {
      score += 50;
      reasons.push('Posible robo de sesión');
    }

    if (data.multipleLogins) {
      score += 25;
      reasons.push('Múltiples inicios de sesión');
    }

    if (data.gpsSpoofing) {
      score += 40;
      reasons.push('GPS falso detectado');
    }

    if (data.emulator) {
      score += 30;
      reasons.push('Emulador detectado');
    }

    if (data.rooted) {
      score += 40;
      reasons.push('Dispositivo root/jailbreak');
    }

    if (
      data.vpnDetected &&
      data.impossibleTravel &&
      data.deviceChanged
    ) {
      score += 40;
      reasons.push('Correlación crítica: VPN + viaje imposible + dispositivo cambiado');
    }

    if (
      data.sessionHijackSuspected &&
      data.multipleLogins
    ) {
      score += 35;
      reasons.push('Correlación crítica: robo de sesión + múltiples logins');
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
      sentinel: {
        correlationActive: true,
        engine: 'VOLTIA_SENTINEL_CORE_V1',
      },
    };
  }
}