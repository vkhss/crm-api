import { NextFunction, Request, Response } from 'express'
import { logger } from '../instances'

const getDebug = async (req: Request, res: Response, next: NextFunction) => {

    //loggando um erro sem nescessariamente estourar uma exeption (Captura o culprit como N/A).
    logger.error({ transactionName: 'Warn Test', transactionData: {}, transactionTags: { dev: 'victor' } })

    return res.status(200).json({ results: "OK" })
}

const postDebug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //forçando um type error (Captura o culprit neste metodo)
        const a = [{
            data: 1
        }]

        const b = a[10].data

        console.log(b)

        return res.status(200).json({ results: "OK" })

    } catch (error) {
        logger.error({ transactionName: 'Error na rota de debug', transactionData: {}, transactionError: error, transactionTags: { dev: 'victor' } })
        next(error);
    }
}

export default { getDebug, postDebug }