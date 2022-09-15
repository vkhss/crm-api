import { IMonitoring, ILogger } from './monitoring.interface'
import { SentryService } from "../monitoring/imp/sentry/sentry.adapter";
import { ElasticAPMService } from "../monitoring/imp/elastic/elastic.adapter";
import { SeverityLevel } from '../monitoring/imp/sentry/severity-level.enum'
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
        params.level = params.level?.toLocaleLowerCase()

        this.errorAdapters.forEach((service) => {
            service.captureTrace(errorMessage, info, params.level)
        })
    }

    public async noticeError(error: Error, level?: SeverityLevel, req?: Request) {
        this.errorAdapters.forEach((service) => {
            service.captureError(error, level, req)
        })
    }

    public fatal(message: string, data: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "fatal")
        })
    }

    public error(message: string, data: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "error")
        })

    }

    public info(message: string, data: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "info")
        })
    }

    public warn(message: string, data: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "warning")
        })
    }

    public debug(message: string, data: { [x: string]: unknown; }): void {
        this.errorAdapters.forEach((service) => {
            service.captureTrace(message, data, "debug")
        })
    }
}