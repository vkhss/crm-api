import apm from 'elastic-apm-node'
import { IMonitoring } from '../../monitoring.interface'

export class ElasticAPMService implements IMonitoring {

    constructor() {
        this.init()
    }
    public init(): void {
      
    }

    async captureTrace(transactionName: string, status: string, transactionData: { [x: string]: unknown }) { //CaptureCodeEvent 

    }

    async captureError(transactionName: string, status: string, transactionError: Error) { //NoticeError 
        apm.captureError(transactionError)
    }
}