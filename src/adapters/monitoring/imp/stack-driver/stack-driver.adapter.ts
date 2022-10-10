import * as StackDriver from '@google-cloud/logging';
import * as apm from 'elastic-apm-node';

import { IMonitoring } from '../imp.interfaces';
import { MonitoringUtils } from '../utils';
import { SeverityLevel } from './stack-driver-severity.enum';

export class StackDriverService implements IMonitoring {
  init() {}

  captureError(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    console.error(
      `{"transactionIds":${
        apm?.currentTransaction?.ids
      },"severity":${StackDriverService.getSeverity(
        transactionStatus,
      )},"name":${transactionName} "data":${MonitoringUtils.stringifyObject(
        transactionData,
        8,
      )}}`,
    );
  }

  captureTrace(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    console.log(
      `{"transactionIds":${
        apm?.currentTransaction?.ids
      },"severity":${StackDriverService.getSeverity(
        transactionStatus,
      )},"name":${transactionName} "data":${MonitoringUtils.stringifyObject(
        transactionData,
        8,
      )}}`,
    );
  }

  private static getSeverity(
    severity?: SeverityLevel,
  ): StackDriver.SeverityNames {
    switch (severity) {
      case SeverityLevel.LOG:
        return 'info';
      case SeverityLevel.INFO:
        return 'info';
      case SeverityLevel.DEBUG:
        return 'debug';
      case SeverityLevel.WARN:
        return 'warning';
      case SeverityLevel.ERROR:
        return 'error';
      case SeverityLevel.FATAL:
        return 'critical';
      default:
        return 'error';
    }
  }
}
