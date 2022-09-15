import { Request } from 'express';
import apm, { Transaction } from 'elastic-apm-node'
import { IMonitoring } from '../../monitoring.interface'
import monitoringConfiguration from '../../monitoring.configuration'

export class ElasticAPMService implements IMonitoring {

    constructor() {
        this.init()
    }
    public init(): void {
        // if (monitoringConfiguration.INIT_ELASTIC && !apm.isStarted()) {
        //     console.log("Iniciando Configuração do APM!")
            
        //     console.log("Finalizou Inicialização do APM!")
        // }
    }

    async captureTrace(transactionName: string, status: string, transactionData: { [x: string]: unknown }) { //CaptureCodeEvent 
        console.log(`Manda o trace de ${status ? status : "error"} para o elastic!`)
    }

    async captureError(transactionName: string, status: string, transactionError: Error) { //NoticeError 
        apm.captureError(transactionError)
    }
}