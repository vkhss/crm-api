import * as Sentry from '@sentry/node';
import * as apm from 'elastic-apm-node';

import { IMonitoring, IMonitoringConfig } from '../imp.interfaces';
import { SeverityLevel } from './sentry-severity.enum';

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV;

export class SentryService implements IMonitoring {
  init(config: IMonitoringConfig) {
    if (config.INIT_SENTRY)
      Sentry.init({
        dsn: SENTRY_DSN,
        debug: SENTRY_ENV !== 'production',
        environment: SENTRY_ENV,
      });
  }

  captureTrace(
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

  captureError(
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

  private static getSeverity(severity?: SeverityLevel): Sentry.SeverityLevel {
    switch (severity) {
      case SeverityLevel.WARN:
        return 'warning';
      case SeverityLevel.ERROR:
        return 'error';
      case SeverityLevel.FATAL:
        return 'fatal';
      default:
        return 'error';
    }
  }
}
