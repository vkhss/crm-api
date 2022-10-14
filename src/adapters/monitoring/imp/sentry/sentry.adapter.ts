import * as Sentry from '@sentry/node';
import * as apm from 'elastic-apm-node';

import { IMonitoring, IMonitoringConfig } from '../imp.interfaces';
import { SeverityLevel } from '../imp.severity.enum';

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV;

export type InitAndCapture = IMonitoring['monitoringInit'] extends IMonitoring['monitoringInit'];

export class SentryService implements InitAndCapture {

  private static severities: Record<string, Sentry.SeverityLevel> = {
    [SeverityLevel.WARN]: 'warning',
    [SeverityLevel.ERROR]: 'error',
    [SeverityLevel.FATAL]: 'fatal',
  }

  public init(config: IMonitoringConfig) {
    if (config.INIT_SENTRY)
      Sentry.init({
        dsn: SENTRY_DSN,
        debug: SENTRY_ENV !== 'production',
        environment: SENTRY_ENV,
      });
  }

  public captureTrace(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    if (transactionStatus === 'info' || transactionStatus === 'debug') return;
    Sentry.captureMessage(transactionName, {
      level: SentryService.getSeverity(transactionStatus),
      extra: {
        info: transactionData,
        apmTransactionIds: apm?.currentTransaction?.ids,
      },
    });
  }

  public captureError(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    Sentry.captureMessage(transactionName, {
      level: SentryService.getSeverity(transactionStatus),
      extra: {
        error: transactionData,
        apmTransactionIds: apm?.currentTransaction?.ids,
      },
    });
  }

  private static getSeverity(severity: SeverityLevel): Sentry.SeverityLevel {
    return SentryService.severities[severity] || 'error'
  }
}