import * as apm from 'elastic-apm-node';

import { IMonitoring } from '../imp.interfaces';

export class ElasticAPMService implements IMonitoring {
  init() {}

  captureTrace() {}

  captureError(transactionData: any) {
    const error = new Error(transactionData);
    apm.captureError(error);
  }
}
