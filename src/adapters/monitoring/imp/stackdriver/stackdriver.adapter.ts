import { SeverityLevel } from './stackdriver-severity.enum'
import { IMonitoring } from '../../monitoring.interface'
import * as StackDriver from '@google-cloud/logging'
import apm from 'elastic-apm-node'


export class StackDriverService implements IMonitoring {

    public init(): void {
    }

    public async captureError(transactionName: string, transactionStatus: SeverityLevel, transactionError: Error): Promise<void> {
        console.log(JSON.stringify({
            transactionIds: apm.currentTransaction?.ids,
            severity: StackDriverService.getSeverity(transactionStatus),
            name: transactionName,
            error: transactionError
        }))
    }

    public async captureTrace(transactionName: string, transactionStatus: SeverityLevel, transactionData: unknown): Promise<void> {
        console.log(JSON.stringify({
            transactionIds: apm.currentTransaction?.ids,
            severity: StackDriverService.getSeverity(transactionStatus),
            name: transactionName,
            data: transactionData
        }))
    }


    private static getSeverity(severity?: SeverityLevel): StackDriver.SeverityNames {
        switch (severity) {
            case SeverityLevel.LOG:
                return 'info';
            case SeverityLevel.INFO:
                return 'info';
            case SeverityLevel.DEBUG:
                return 'debug'
            case SeverityLevel.WARN:
                return 'warning';
            case SeverityLevel.ERROR:
                return 'error';
            case SeverityLevel.FATAL:
                return 'critical';
            default:
                return 'error';
        }
    }
}