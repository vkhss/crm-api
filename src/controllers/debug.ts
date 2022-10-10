import { NextFunction, Request, Response } from 'express'
import { logger } from '../instances'

const getDebug = async (req: Request, res: Response, next: NextFunction) => {
    logger.warn("REQUEST OK", [{ cpf: "123456789" }])

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