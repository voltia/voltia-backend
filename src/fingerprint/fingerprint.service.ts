import { Injectable } from '@nestjs/common';

@Injectable()
export class FingerprintService {
  analyze(data: any) {
    let score = 0;

    if (!data.deviceId) score += 25;
    if (!data.platform) score += 15;
    if (data.isBot === true) score += 40;
    if (data.deviceChanged === true) score += 25;
    if (data.ipChanged === true) score += 20;
    if (data.locationJump === true) score += 30;
    if (data.userAgentSuspicious === true) score += 20;

    let level = 'LOW';

    if (score >= 80) level = 'CRITICAL';
    else if (score >= 50) level = 'HIGH';
    else if (score >= 25) level = 'MEDIUM';

    return {
      score,
      level,
      trusted: score < 50,
      signals: {
        deviceId: data.deviceId || null,
        platform: data.platform || null,
        isBot: !!data.isBot,
        deviceChanged: !!data.deviceChanged,
        ipChanged: !!data.ipChanged,
        locationJump: !!data.locationJump,
        userAgentSuspicious: !!data.userAgentSuspicious,
      },
    };
  }
}