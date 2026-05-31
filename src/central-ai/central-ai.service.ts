import { Injectable } from '@nestjs/common';
import { RealtimeOrchestratorService } from '../realtime-orchestrator/realtime-orchestrator.service';

@Injectable()
export class CentralAIService {
  constructor(
    private readonly realtimeOrchestrator: RealtimeOrchestratorService,
  ) {}

  analyze(data: any) {
    return this.analyzeGlobalThreat(data);
  }

  analyzeGlobalThreat(data: any) {
    let level = 'LOW';
    let action = 'ALLOW';

    const alerts: string[] = [];

    if (data.integrityRisk) alerts.push('Integrity Risk');
    if (data.deviceRisk) alerts.push('Device Risk');
    if (data.geoRisk) alerts.push('Geo Risk');
    if (data.sessionRisk) alerts.push('Session Risk');
    if (data.threatRisk) alerts.push('Threat AI Risk');
    if (data.behaviorRisk) alerts.push('Behavioral AI Risk');
    if (data.shadowModeRequired) alerts.push('Shadow Mode Required');
    if (data.tacticalResponseRequired) alerts.push('Tactical Response Required');

    if (alerts.length >= 6) {
      level = 'CRITICAL';
      action = 'SOS_ESCALATION';
    } else if (alerts.length >= 4) {
      level = 'CRITICAL';
      action = 'LOCKDOWN';
    } else if (alerts.length >= 2) {
      level = 'HIGH';
      action = 'FREEZE_SESSION';
    } else if (alerts.length >= 1) {
      level = 'MEDIUM';
      action = 'MONITOR';
    }

    const result = {
      success: true,
      centralAI: {
        score: alerts.length * 100,
        level,
        action,
        trusted: level === 'LOW',
        reasons: alerts,
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

    if (level === 'HIGH' || level === 'CRITICAL') {
      this.realtimeOrchestrator.broadcastCriticalEvent({
        event: 'CENTRAL_AI_CRITICAL_EVENT',
        level,
        action,
        device: data.device || 'UNKNOWN_DEVICE',
        reasons: alerts,
        engine: 'VOLTIA_CENTRAL_AI_ORCHESTRATOR_V1',
      });
    }

    return result;
  }
}