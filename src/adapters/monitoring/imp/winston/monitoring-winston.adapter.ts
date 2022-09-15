import winston from 'winston'
import SentryConfig from '../sentry/sentry.configuration'
const ecsFormat = require('@elastic/ecs-winston-format')
import apm from 'elastic-apm-node'
const Sentry = require('winston-transport-sentry-node').default
import { ILogger } from '../../monitoring.interface'

apm.start()

export class WinstonService implements ILogger {

    private async createLogger(): Promise<any> {

        const apmTransactionIds = apm.currentTransaction?.ids
        const winstonFormat = (info: winston.Logform.TransformableInfo): any => {
            const data = info
            if (typeof data.message === 'object') {
                data.data = data.message;
                data.message = JSON.stringify(data.message)
            }
        }
        const logger = winston.createLogger({
            defaultMeta: { apmTransactionIds },
            transports: [
                new winston.transports.Console({ format: winston.format.combine(winston.format(winstonFormat)(), ecsFormat()) }),
                new Sentry(SentryConfig)
            ]
        });
        return logger
    }

    public async error(message: string, data: { [x: string]: unknown }) {
        const logger = await this.createLogger()
        logger.log({ level: "error", message, data });
    }

    public async warn(message: string, data: { [x: string]: unknown }) {
        const logger = await this.createLogger()
        logger.log({ level: "warn", message, data });
    }

    public async info(message: string, data: { [x: string]: unknown }) {
        const logger = await this.createLogger()
        logger.log({ level: "info", message, data });
    }

    public async debug(message: string, data: { [x: string]: unknown }) {
        const logger = await this.createLogger()
        logger.log({ level: "debug", message, data });
    }
}