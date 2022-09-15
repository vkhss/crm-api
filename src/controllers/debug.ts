import { NextFunction, Request, Response } from 'express'
import { WinstonService } from '../adapters/monitoring/imp/winston/monitoring-winston.adapter'

const logger = new WinstonService()

const getDebug = async (req: Request, res: Response, next: NextFunction) => {

    logger.info("REQUEST ANTES DE SER ENVIADA PARA A ROTA", { req,  CPF: "448.XXX.XXX.XXX" })
    return res.status(200).json({ results: "OK" })
}

const postDebug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("ERRO NA ROTA POST DEBUG!")
    } catch (error) {
        await logger.error("INTERNAL SERVER ERROR", { request: req, response: res })
        next(error);
    }
}

export default { getDebug, postDebug }