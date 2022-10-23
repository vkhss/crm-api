import ElasticAgent from 'elastic-apm-node';

import { IMonitoring } from '../imp.interfaces';
import { MonitoringUtils } from '../utils';
import { SeverityLevel } from '../severity.level.enum';

export class StackDriverService implements IMonitoring {
  public init() {}

  public captureTrace(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData: object
  ) {
    const maxDeep = 8;
    console.log(
      JSON.stringify({
        transactionIds: ElasticAgent?.currentTransaction?.ids,
        severity: transactionStatus,
        name: transactionName,
        data: MonitoringUtils.stringifyObject(transactionData, maxDeep),
      })
    );
  }

  public captureError(
    transactionName: string,
    transactionError?: Error,
    transactionStatus?: SeverityLevel
  ) {
    const maxDeep = 8;
    console.error(
      JSON.stringify({
        transactionIds: ElasticAgent?.currentTransaction?.ids,
        severity: transactionStatus,
        name: transactionName,
        error: MonitoringUtils.stringifyObject(
          transactionError ? transactionError.name : transactionName,
          maxDeep
        ),
      })
    );
  }
}
