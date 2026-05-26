import {
  Injectable,
  NestMiddleware,
  Logger,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  private readonly logger = new Logger('VOLTIA_SECURITY');

  use(req: Request, res: Response, next: NextFunction) {
    const ip =
      req.ip ||
      req.socket.remoteAddress ||
      'unknown';

    const userAgent =
      req.headers['user-agent'] || 'unknown';

    const bodyString = JSON.stringify(req.body || {});

    const suspiciousPatterns = [
      /<script>/gi,
      /SELECT.*FROM/gi,
      /UNION.*SELECT/gi,
      /DROP TABLE/gi,
      /INSERT INTO/gi,
      /DELETE FROM/gi,
      /OR 1=1/gi,
      /--/g,
      /xp_cmdshell/gi,
    ];

    const detected = suspiciousPatterns.some((pattern) =>
      pattern.test(bodyString),
    );

    if (detected) {
      this.logger.error(`
🚨 VOLTIA SECURITY ALERT
IP: ${ip}
PATH: ${req.originalUrl}
METHOD: ${req.method}
USER_AGENT: ${userAgent}
BODY: ${bodyString}
      `);

      return res.status(403).json({
        success: false,
        message: 'Actividad sospechosa detectada',
      });
    }

    next();
  }
}