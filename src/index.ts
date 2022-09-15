import 'dotenv/config';
import express, { NextFunction } from 'express'
import customerRouter from './routers/customers'
import debugRouter from './routers/debug';
import { WinstonService } from './adapters/monitoring/imp/winston/monitoring-winston.adapter';
const HOST = process.env.HOST
const PORT = process.env.PORT

const logger = new WinstonService()

const app = express()

app.use((error: Error, req: any, res: any, next: NextFunction) => {

    logger.error(JSON.stringify(error.message || error), { error })

    res.status(500).json(error);
    next();
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})

app.use('/', customerRouter);
app.use('/', debugRouter)

<<<<<<< HEAD
app.use((error: Error, req: any, res: any, next: NextFunction) => {

    monitoring.fatal('INTERNAL SERVER ERROR', { request: req, response: res })

    res.status(500).json(error)
    next();
})

=======
>>>>>>> design
app.use((req, res) => {
    res.status(404)
})



