type ObjectInfo = Record<string, unknown>;
import { SeverityLevel } from '@sentry/node';
import { Request } from 'express';

export interface IMonitoring {
    init(): void
    captureTrace(transactionName: string, transactionStatus: SeverityLevel, transactionData: { [x: string]: unknown }): Promise<void>;
    captureError(transactionName: string, transactionStatus: SeverityLevel, transactionError: Error): Promise<void>;
}

export interface ILogger {
    error(transactionName: string, transactionData?: Error): void;
    fatal(transactionName: string, transactionData?: Error): void;
    info(transactionName: string, data?: ObjectInfo): void;
    warn(transactionName: string, data?: ObjectInfo): void;
    debug(transactionName: string, data?: ObjectInfo): void;
}
