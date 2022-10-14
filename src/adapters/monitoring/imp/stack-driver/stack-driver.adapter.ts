import * as apm from 'elastic-apm-node';

import { IMonitoring } from '../imp.interfaces';
import { MonitoringUtils } from '../utils';
import { SeverityLevel } from '../imp.severity.enum';

export type Capture = IMonitoring['monitoringCapture'];

export class StackDriverService implements Capture {

  public captureError(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    console.error(
      `{"transactionIds":${apm?.currentTransaction?.ids
      },"severity":${
        transactionStatus
      },"name":${transactionName}, "data":${MonitoringUtils.stringifyObject(
        transactionData,
        8,
      )}}`,
    );
  }

  public captureTrace(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: unknown,
  ) {
    console.log(
      `{"transactionIds":${apm?.currentTransaction?.ids
      },"severity":${
        transactionStatus
      },"name":${transactionName}, "data":${MonitoringUtils.stringifyObject(
        transactionData,
        8,
      )}}`,
    );
  }
}
