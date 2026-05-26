import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SecurityLogService {
  private readonly logger = new Logger('VOLTIA_SECURITY');

  logEvent(type: string, message: string, metadata?: Record<string, any>) {
    this.logger.warn(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          type,
          message,
          metadata: metadata || {},
        },
        null,
        2,
      ),
    );
  }

  loginSuccess(email: string, ip?: string) {
    this.logEvent('LOGIN_SUCCESS', 'Usuario autenticado', { email, ip });
  }

  loginFailed(email: string, ip?: string) {
    this.logEvent('LOGIN_FAILED', 'Intento fallido de login', { email, ip });
  }

  suspiciousRequest(reason: string, ip?: string) {
    this.logEvent('SUSPICIOUS_REQUEST', reason, { ip });
  }

  rateLimitExceeded(ip?: string) {
    this.logEvent('RATE_LIMIT', 'Demasiadas peticiones detectadas', { ip });
  }
}