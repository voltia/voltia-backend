import { Injectable } from '@nestjs/common';

@Injectable()
export class TacticalResponseService {
  execute(data: any) {
    const actions: string[] = [];
    const reasons: string[] = [];

    if (data.lockdown) {
      actions.push('LOCKDOWN');
      reasons.push('Bloqueo total activado');
    }

    if (data.freezeSession) {
      actions.push('FREEZE_SESSION');
      reasons.push('Sesión congelada');
    }

    if (data.silentAlert) {
      actions.push('SILENT_ALERT');
      reasons.push('Alerta silenciosa enviada');
    }

    if (data.evidenceCapture) {
      actions.push('EVIDENCE_CAPTURE');
      reasons.push('Captura de evidencia activada');
    }

    if (data.decoyInterface) {
      actions.push('DECOY_INTERFACE');
      reasons.push('Interfaz señuelo activada');
    }

    if (data.emergencyIsolation) {
      actions.push('EMERGENCY_ISOLATION');
      reasons.push('Aislamiento de emergencia activado');
    }

    return {
      success: true,
      tacticalResponse: {
        executed: true,
        severity: data.severity || 'CRITICAL',
        actions,
        reasons,
        state: 'TACTICAL_RESPONSE_ACTIVE',
        engine: 'VOLTIA_TACTICAL_RESPONSE_V1',
      },
    };
  }
}