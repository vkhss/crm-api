import { NextFunction, Request, Response } from 'express'
import { MonitoringService } from '../monitoring/services/monitoring.service'

const monitoring = new MonitoringService()


const getDebug = async (req: Request, res: Response, next: NextFunction) => {

    monitoring.warn("REQUEST OK", { results: "OK" }, req.path)

    return res.status(200).json({ results: "OK" })

}

const postDebug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("ERRO NA ROTA POST DEBUG!")
    } catch (error) {

        monitoring.captureCodeEvent({
            "level": 'Fatal',
            "briefDescription": 'Não foi possível atualizar dados do aluno na billing',
            "jsonInfoObject": {
                "request": req.body,
            }
        })
        next(error);
    }
}

export default { getDebug, postDebug }