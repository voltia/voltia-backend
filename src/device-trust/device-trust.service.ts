import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceTrustService {
  analyze(data: any) {
    let score = 0;

    if (data.deviceChanged) score += 30;
    if (data.simChanged) score += 35;
    if (data.sessionHijackSuspected) score += 45;
    if (data.impossibleTravel) score += 40;
    if (data.multipleLogins) score += 25;
    if (data.gpsSpoofing) score += 35;
    if (data.vpnDetected) score += 15;
    if (data.proxyDetected) score += 20;

    let level = 'LOW';

    if (score >= 90) level = 'CRITICAL';
    else if (score >= 60) level = 'HIGH';
    else if (score >= 30) level = 'MEDIUM';

    return {
      score,
      level,
      trusted: score < 60,
      action:
        score >= 90
          ? 'FREEZE_SESSION'
          : score >= 60
            ? 'REQUIRE_REAUTH'
            : score >= 30
              ? 'MONITOR'
              : 'ALLOW',
      signals: {
        deviceChanged: !!data.deviceChanged,
        simChanged: !!data.simChanged,
        sessionHijackSuspected: !!data.sessionHijackSuspected,
        impossibleTravel: !!data.impossibleTravel,
        multipleLogins: !!data.multipleLogins,
        gpsSpoofing: !!data.gpsSpoofing,
        vpnDetected: !!data.vpnDetected,
        proxyDetected: !!data.proxyDetected,
      },
    };
  }
}