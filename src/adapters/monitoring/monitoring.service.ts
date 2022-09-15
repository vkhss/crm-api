import { IMonitoring, ILogger } from './monitoring.interface'
import { SentryService } from "../monitoring/imp/sentry/sentry.adapter";
import { ElasticAPMService } from "../monitoring/imp/elastic/elastic.adapter";

export class MonitoringService implements ILogger {

    private sentryService: SentryService
    private elasticService: ElasticAPMService
    private errorAdapters: IMonitoring[] = [];

    constructor() {
        this.sentryService = new SentryService()
        this.elasticService = new ElasticAPMService()
        this.errorAdapters.push(...[this.sentryService, this.elasticService])
    }

    public error(transactionName: string, transactionData: Error): void {
        this.errorAdapters.forEach((service) => {
            service.captureError(transactionName, "error", transactionData)
        })
    }

    public fatal(transactionName: string, transactionData: Error): void {
        this.errorAdapters.forEach((service) => {
            service.captureError(transactionName, "fatal", transactionData)
        })
    }

    public warn(transactionName: string, transactionData: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(transactionName, "warning", transactionData)
        })
    }

    public info(transactionName: string, transactionData: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(transactionName, "info", transactionData)
        })
    }

    public debug(transactionName: string, transactionData: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(transactionName, "debug", transactionData)
        })
    }
}