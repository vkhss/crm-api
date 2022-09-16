import { IMonitoring, ILogger } from './monitoring.interface'
import { SentryService } from "../monitoring/imp/sentry/sentry.adapter";
import { ElasticAPMService } from "../monitoring/imp/elastic/elastic.adapter";
import { StackDriverService } from './imp/stackdriver/stackdriver.adapter';
import monitoringConfig from "./monitoring.configuration";
import apm from 'elastic-apm-node'

apm.start()

export class MonitoringService implements ILogger {

    private sentryService: SentryService
    private elasticService: ElasticAPMService
    private stackdriveService: StackDriverService
    private adapters: IMonitoring[] = [];

    constructor() {
        this.sentryService = new SentryService()
        this.elasticService = new ElasticAPMService()
        this.stackdriveService = new StackDriverService()
        this.adapters.push(...[this.sentryService, this.elasticService, this.stackdriveService])
    }

    public async error(transactionName: string, transactionData: Error) {
        this.adapters.forEach((service) => {
            service.captureError(transactionName, "error", transactionData)
        })
    }

    public async fatal(transactionName: string, transactionData: Error) {
        this.adapters.forEach((service) => {
            service.captureError(transactionName, "fatal", transactionData)
        })
    }

    public async warn(transactionName: string, transactionData: unknown) {
        transactionData = await this.sanatizeObject(transactionData, monitoringConfig.FIELD_MASK)
        this.adapters.forEach((service) => {
            service.captureTrace(transactionName, "warning", transactionData)
        })
    }

    public async info(transactionName: string, transactionData: unknown) {
        transactionData = await this.sanatizeObject(transactionData, monitoringConfig.FIELD_MASK)
        this.adapters.forEach((service) => {
            service.captureTrace(transactionName, "info", transactionData)
        })
    }

    public async debug(transactionName: string, transactionData: unknown) {
        transactionData = await this.sanatizeObject(transactionData, monitoringConfig.FIELD_MASK)
        this.adapters.forEach((service) => {
            service.captureTrace(transactionName, "debug", transactionData)
        })
    }

    private async sanatizeObject(body: unknown, fiedsToRemove?: string[]): Promise<any> {
        if (!fiedsToRemove || fiedsToRemove.length == 0) return body
        const encryptFiels = async (body: any, fiedsToRemove: string[]): Promise<any> => {
            if (Array.isArray(body) && body.length > 1) {
                for (const object of body) await encryptFiels(object, fiedsToRemove)
            }
            if (typeof body === 'object') {
                for (const field in body) {
                    if (typeof body[field] === 'object') await encryptFiels(body[field], fiedsToRemove)
                    if (fiedsToRemove.includes(field)) {
                        body[field] = '[redacted]'
                        continue;
                    }
                }
            }
            return body
        }
        return await encryptFiels(body, fiedsToRemove)
    }
}