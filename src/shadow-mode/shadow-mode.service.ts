import { Injectable } from '@nestjs/common';

@Injectable()
export class ShadowModeService {
  activate(data: any) {
    const reasons: string[] = [];

    if (data.threatLevel === 'CRITICAL') {
      reasons.push('Nivel crítico detectado');
    }

    if (data.sessionHijackSuspected) {
      reasons.push('Posible robo de sesión');
    }

    if (data.deviceChanged) {
      reasons.push('Cambio de dispositivo');
    }

    if (data.behavioralRisk) {
      reasons.push('Riesgo de comportamiento');
    }

    return {
      success: true,
      shadowMode: {
        active: true,
        action: 'DECOY_INTERFACE',
        visibleState: 'NORMAL_APP',
        realState: 'LOCKED_AND_MONITORED',
        telemetry: 'SILENT_CAPTURE',
        reasons,
        engine: 'VOLTIA_SHADOW_MODE_V1',
      },
    };
  }
}