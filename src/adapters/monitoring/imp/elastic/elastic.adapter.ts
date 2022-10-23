import ElasticAgent from 'elastic-apm-node';

import { IMonitoring } from '../imp.interfaces';

export class ElasticAPMService implements IMonitoring {
  public init() {}

  public captureTrace() {}

  public captureError(transactionName: string, transactionError?: Error) {
    ElasticAgent.captureError(transactionError ?? transactionName);
  }
}
