
import { SeverityLevel } from '@sentry/node'
import { IMonitoring } from '../../monitoring.interface'
export class StackDriverService implements IMonitoring {

    public init(): void {
        
    }


    public async captureError(transactionName: string, transactionStatus: SeverityLevel, transactionError: Error): Promise<void> {
        
    }

    public async captureTrace(transactionName: string, transactionStatus: SeverityLevel, transactionData: { [x: string]: unknown }): Promise<void> {
        
    }

}