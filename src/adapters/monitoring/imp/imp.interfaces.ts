import { SeverityLevel } from './severity.level.enum';

export type ObjectTags = Record<string, string>;

export type TraceLog = {
  transactionName: string;
  transactionData: object;
  transactionTags?: ObjectTags;
};

export type ErrorLog = {
  transactionName: string;
  transactionError?: Error | unknown | undefined;
  transactionData?: object;
  transactionTags?: ObjectTags;
};

export interface IMonitoring {
  init(monitoringConfiguration?: IMonitoringConfig): void;
  captureTrace(
    transactionName: string,
    transactionStatus: SeverityLevel,
    transactionData?: object,
    transactionTags?: ObjectTags
  ): void;
  captureError(
    transactionName: string,
    transactionError?: Error | unknown | undefined,
    transactionStatus?: SeverityLevel,
    transactionData?: object,
    transactionTags?: ObjectTags
  ): void;
}

export interface ILogger {
  startMonitoring(config: IMonitoringConfig): void;
  error(data: ErrorLog): void;
  fatal(data: ErrorLog): void;
  warn(data: TraceLog): void;
  info(data: TraceLog): void;
  debug(data: TraceLog): void;
}

export interface IMonitoringConfig {
  INIT_ELASTIC?: boolean;
  INIT_SENTRY?: boolean;
  FIELD_MASK?: string[];
  BLOCK_STATUS?: number[];
}
