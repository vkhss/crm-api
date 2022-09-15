import { SeverityLevel } from './stackdrive-severity.enum'
import { IMonitoring } from '../../monitoring.interface'
import * as StackDriver from '@google-cloud/logging'
import loggingConfig from './stackdrive.config'
export class StackDriverService implements IMonitoring {

    private logging: StackDriver.Logging
    private log: StackDriver.Log

    constructor() {
        this.logging = new StackDriver.Logging({ projectId: loggingConfig.projectId })
        this.log = this.logging.log(loggingConfig['log-name'])
    }

    public init(): void {

    }

    public async captureError(transactionName: string, transactionStatus: SeverityLevel, transactionError: Error): Promise<void> {
        const metadata = {
            resource: { type: 'global' },
            severity: StackDriverService.getSeverity(transactionStatus),
        };
        console.log(metadata)
        const entry = this.log.entry(metadata, transactionName);
        await this.log.write(entry);
    }

    public async captureTrace(transactionName: string, transactionStatus: SeverityLevel, transactionData: { [x: string]: unknown }): Promise<void> {
        const metadata = {
            resource: { type: 'global' },
            severity: StackDriverService.getSeverity(transactionStatus),
        };
        console.log(metadata)
        const entry = this.log.entry(metadata, transactionName);
        await this.log.write(entry);
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