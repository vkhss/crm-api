import { NextFunction, Request, Response } from 'express'
import { MonitoringService } from '../monitoring/services/monitoring.service'

const monitoring = new MonitoringService()


const getDebug = async (req: Request, res: Response, next: NextFunction) => {

    monitoring.warn("REQUEST OK", { results: "OK" })

    return res.status(200).json({ results: "OK" })
}

const postDebug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("ERRO NA ROTA POST DEBUG!")
    } catch (error) {
        next(error);
    }
}

export default { getDebug, postDebug }