type ObjectInfo = Record<string, unknown>;
import { Request } from 'express';
import { SeverityLevel } from '../config/severity-level.enum';

export interface IMonitoring {
    init(): void
    captureTrace(message: string, data: { [x: string]: unknown }, level?: string, path?: string): Promise<void>;
    captureError(error: Error, level?: SeverityLevel, req?: Request): Promise<void>;
}

export interface ILogger {
    fatal(message: string, data?: ObjectInfo, path?: string): void;
    info(message: string, data?: ObjectInfo, path?: string): void;
    warn(message: string, data?: ObjectInfo, path?: string): void;
    error(message: string, data?: ObjectInfo, path?: string): void;
    debug(message: string, data?: ObjectInfo, path?: string): void;
}