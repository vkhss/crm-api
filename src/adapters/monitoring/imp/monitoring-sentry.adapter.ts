import { Request } from 'express';
import * as Sentry from '@sentry/node';
import { IMonitoring } from '../monitoring.interface';
import monitoringConfiguration from '../monitoring.configuration';

export class SentryService implements IMonitoring {
    private prefix = '';

    constructor() {
        this.init()
    }

    public init() {
        if (monitoringConfiguration.INIT_SENTRY)
            Sentry.init(SentryAdapterConfig);
    }

    async captureTrace(message: string, data: { [x: string]: unknown }, level?: Sentry.SeverityLevel, path?: string) {
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

    async captureError(error: Error, level?: Sentry.SeverityLevel, req?: Request) {
        console.log(`Manda o erro para o sentry!`)
        if (req) {
            const { path, body, params } = req
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

    private static getSeverity(severity?: Sentry.SeverityLevel): Sentry.SeverityLevel {
        switch (severity) {
            case Sentry.SeverityLevel.WARN:
                return 'warning';
            case Sentry.SeverityLevel.ERROR:
                return 'error';
            case Sentry.SeverityLevel.FATAL:
                return 'fatal';
            default:
                return 'error';
        }
    }
}

