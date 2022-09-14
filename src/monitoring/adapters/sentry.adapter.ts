import { Request } from 'express';
import * as Sentry from '@sentry/node';
import { SeverityLevel } from '../config/severity-level.enum'
import { IMonitoring } from '../interfaces/monitoring.interface';
import SentryAdapterConfig from '../config/sentry.configuration';
import monitoringConfiguration from '../config/monitoring.configuration'

export class SentryService implements IMonitoring {
    private prefix = '';

    constructor() {
        this.init()
    }

    public init() {
        if (monitoringConfiguration.INIT_SENTRY)
            Sentry.init(SentryAdapterConfig);
    }

    async captureTrace(message: string, data: { [x: string]: unknown }, level?: SeverityLevel, path?: string) {
        console.log(`Manda o trace de ${level ? level : "error"} para o sentry!`)
        Sentry.captureMessage(`${this.prefix} ${message}`.trim(), {
            level: level ? level : "error",
            tags: {
                path: path ? path : "unknown"
            },
            extra: {
                info: data
            }
        });
    }

    async captureError(error: Error, level?: SeverityLevel, req?: Request) {
        console.log(`Manda o erro para o sentry!`)
        if (req) {
            let { path, body, params } = req
            Sentry.captureMessage(JSON.stringify(error.message || error), {
                level: SentryService.getSeverity(level),
                tags: {
                    path,
                },
                extra: {
                    error: JSON.stringify(error),
                    body,
                    params
                }
            });
        }
    }

    private static getSeverity(severity?: SeverityLevel): Sentry.SeverityLevel {
        switch (severity) {
            case SeverityLevel.WARN:
                return 'warning';
            case SeverityLevel.ERROR:
                return 'error';
            case SeverityLevel.FATAL:
                return 'fatal';
            default:
                return 'error';
        }
    }
}

