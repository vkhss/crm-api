import { NextFunction, Request, Response } from 'express'
import { MonitoringService } from '../adapters/monitoring/monitoring.service'

const logger = new MonitoringService()

const getDebug = async (req: Request, res: Response, next: NextFunction) => {
    logger.warn("REQUEST OK", [{ cpf: "44808709899" }])

    return res.status(200).json({ results: "OK" })
}

const postDebug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw "ERRO NA ROTA POST DEBUG!"

    } catch (error) {
        next(error);
    }
}

export default { getDebug, postDebug }