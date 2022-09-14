import { IMonitoring, ILogger } from './monitoring.interface'
import { SentryService } from "./imp/sentry/monitoring-sentry.adapter";
import { ElasticAPMService } from "./imp/elastic/monitoring-elastic.adapter"
import { SeverityLevel } from './imp/sentry/severity-level.enum'
import { Request } from 'express';

export class MonitoringService implements ILogger {

    private sentryService: SentryService
    private elasticService: ElasticAPMService
    private errorAdapters: IMonitoring[] = [];

    constructor() {
        this.sentryService = new SentryService()
        this.elasticService = new ElasticAPMService()
        this.errorAdapters.push(...[this.sentryService, this.elasticService])
    }

    public async captureCodeEvent(params: any) {
        const errorMessage = params.briefDescription
        const info = params.jsonInfoObject
        let path = params.request ? params.request.path ? params.request.path : "unknown" : "unknown"
        params.level = params.level?.toLocaleLowerCase()

        this.errorAdapters.forEach((service) => {
            service.captureTrace(errorMessage, info, params.level, path)
        })
    }

    public async noticeError(error: Error, level?: SeverityLevel, req?: Request) {
        this.errorAdapters.forEach((service) => {
            service.captureError(error, level, req)
        })
    }

    public fatal(message: string, data: { [x: string]: unknown; }, path?: string): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "fatal", path)
        })
    }

    public error(message: string, data: { [x: string]: unknown; }, path?: string): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "error", path)
        })

    }

    public info(message: string, data: { [x: string]: unknown; }, path?: string): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "info", path)
        })
    }

    public warn(message: string, data: { [x: string]: unknown; }, path?: string): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "warning", path)
        })
    }

    public debug(message: string, data: { [x: string]: unknown; }, path?: string): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "debug", path)
        })
    }
}