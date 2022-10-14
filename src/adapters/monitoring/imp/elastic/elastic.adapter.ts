import * as apm from 'elastic-apm-node';

export type MonitoringError = Omit<IMonitoring['monitoringCapture'], 'captureTrace'>;

import { IMonitoring } from '../imp.interfaces';

export class ElasticAPMService implements MonitoringError {
  public captureError(transactionData: any) {
    const error = new Error(transactionData);
    apm.captureError(error);
  }
}
