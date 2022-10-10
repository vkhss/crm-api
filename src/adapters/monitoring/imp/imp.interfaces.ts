type ObjectInfo = Record<string, unknown>;
import { SeverityLevel } from '@sentry/node';

export interface IMonitoring {
  init(monitoringConfiguration?: IMonitoringConfig);
  captureTrace(
    transactionName?: string,
    transactionStatus?: SeverityLevel,
    transactionData?: unknown,
  );
  captureError(
    transactionName?: string,
    transactionStatus?: SeverityLevel,
    transactionData?: unknown,
  );
}

export interface ILogger {
  startMonitoring(config: IMonitoringConfig): void;
  error(transactionName: string, transactionData: ObjectInfo): void;
  fatal(transactionName: string, transactionData: ObjectInfo): void;
  info(transactionName: string, transactionData: ObjectInfo): void;
  warn(transactionName: string, transactionData: ObjectInfo): void;
  debug(transactionName: string, transactionData: ObjectInfo): void;
}

export interface IMonitoringConfig {
  INIT_ELASTIC?: boolean;
  INIT_SENTRY?: boolean;
  FIELD_MASK?: string[];
  BLOCK_STATUS?: number[];
}
