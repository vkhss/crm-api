import * as Sentry from '@sentry/node';
import { SeverityLevel } from './sentry-severity.enum'
import { IMonitoring } from '../../monitoring.interface'
import SentryAdapterConfig from './sentry.configuration';
import monitoringConfiguration from '../../monitoring.configuration'
import apm from 'elastic-apm-node'

export class SentryService implements IMonitoring {
    private prefix = '';

    constructor() {
        this.init()
    }

    public init() {
        if (monitoringConfiguration.INIT_SENTRY)
            Sentry.init(SentryAdapterConfig);
    }

    async captureTrace(transactionName: string, transactionStatus: SeverityLevel, transactionData: { [x: string]: unknown }) {
        if (transactionStatus == "info" || transactionStatus == "debug") return;

        console.log(`Manda o trace de ${transactionStatus ? transactionStatus : "error"} para o sentry!`)

        Sentry.captureMessage(`${this.prefix} ${transactionName}`.trim(), {
            level: transactionStatus,
            extra: {
                info: transactionData,
                apmTransactionIds: apm.currentTransaction?.ids
            }
        });
    }

    async captureError(transactionName: string, transactionStatus: SeverityLevel, transactionError: Error) {
        console.log(`Manda o erro para o sentry!`)
        Sentry.captureMessage(JSON.stringify(transactionError.message || transactionError), {
            level: SentryService.getSeverity(transactionStatus),
            extra: {
                error: JSON.stringify(transactionError),
                apmTransactionIds: apm.currentTransaction?.ids
            }
        });
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