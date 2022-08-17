import { NextFunction, Request, Response } from "express";
import ElasticApmNode from 'elastic-apm-node'

const getUserCpfApm = async (req: Request, res: Response, next: NextFunction) => {
    ElasticApmNode.setUserContext({
        id: req.body.cpf
    })
    next();
}

export default { getUserCpfApm }