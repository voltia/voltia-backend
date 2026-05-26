import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceRiskService {
  calculateRisk(data: any) {
    let score = 0;

    if (data.emulator) {
      score += 30;
    }

    if (data.rooted) {
      score += 40;
    }

    if (data.mockLocation) {
      score += 25;
    }

    if (data.vpn) {
      score += 10;
    }

    let level = 'LOW';

    if (score >= 70) {
      level = 'CRITICAL';
    } else if (score >= 40) {
      level = 'HIGH';
    } else if (score >= 20) {
      level = 'MEDIUM';
    }

    return {
      score,
      level,
      threats: {
        emulator: !!data.emulator,
        rooted: !!data.rooted,
        mockLocation: !!data.mockLocation,
        vpn: !!data.vpn,
      },
    };
  }
}