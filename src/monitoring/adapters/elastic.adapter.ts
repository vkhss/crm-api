import { Request } from 'express';
import ElasticApmNode from 'elastic-apm-node'
import { IMonitoring } from '../interfaces/monitoring.interface'
import monitoringConfiguration from '../config/monitoring.configuration'

export class ElasticAPMService implements IMonitoring {

    constructor() {
        this.init()
    }
    public init(): void {
        if (monitoringConfiguration.INIT_ELASTIC && !ElasticApmNode.isStarted()) {
            ElasticApmNode.start()
        }
    }

    async captureTrace(essage: string, data: { [x: string]: unknown }, level?: string, path?: string) { //CaptureCodeEvent 
        console.log(`Manda o trace de ${level ? level : "error"} para o elastic!`)

        //Implementar Tracing Elastic
    }

    async captureError(error: Error, severity?: string, req?: Request) { //NoticeError 
        console.log(`Manda o erro para o elastic!`)
        ElasticApmNode.captureError(error)
    }
}
