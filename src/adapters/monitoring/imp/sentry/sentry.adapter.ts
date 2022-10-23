import * as Sentry from '@sentry/node';
import ElasticAgent from 'elastic-apm-node';

import { IMonitoring, IMonitoringConfig, ObjectTags } from '../imp.interfaces';
import { SeverityLevel } from '../severity.level.enum';

const { SENTRY_DSN } = process.env;
const { SENTRY_ENV } = process.env;

export class SentryService implements IMonitoring {
  private static severities: Record<string, Sentry.SeverityLevel> = {
    [SeverityLevel.WARN]: 'warning',
    [SeverityLevel.ERROR]: 'error',
    [SeverityLevel.FATAL]: 'fatal',
  };

  public init(config: IMonitoringConfig) {
    console.log(SENTRY_DSN)
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
    transactionData: object,
    transactionTags?: ObjectTags
  ) {
    if (transactionStatus === 'info' || transactionStatus === 'debug') return;

    Sentry.withScope(scope => {
      scope.setLevel(SentryService.getSeverity(transactionStatus));

      Sentry.setTags(transactionTags ?? {});

      Sentry.captureMessage(transactionName, {
        level: SentryService.getSeverity(transactionStatus),
        extra: {
          info: transactionData,
          apmTransactionIds: ElasticAgent?.currentTransaction?.ids,
        },
      });
    });
  }

  public captureError(
    transactionName: string,
    transactionError: Error,
    transactionStatus: SeverityLevel,
    transactionData?: object,
    transactionTags?: ObjectTags
  ) {
    Sentry.withScope(scope => {
      scope.setLevel(SentryService.getSeverity(transactionStatus));

      Sentry.setTags(transactionTags ?? {});

      Sentry.captureMessage(transactionName, {
        extra: {
          error: transactionError ?? transactionName,
          data: transactionData,
          apmTransactionIds: ElasticAgent?.currentTransaction?.ids,
        },
      });
    });
  }

  private static getSeverity(severity: SeverityLevel): Sentry.SeverityLevel {
    return SentryService.severities[severity] || 'error';
  }
}
