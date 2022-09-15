import 'dotenv/config';
import express, { NextFunction } from 'express'
import customerRouter from './routers/customers'
import debugRouter from './routers/debug';
import { MonitoringService } from './adapters/monitoring/monitoring.service';

import apm from 'elastic-apm-node';
const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

const logger = new MonitoringService()

console.log({ apmIsStarted: apm.isStarted() })
console.log({ apmTransactionIds: apm.currentTransaction?.ids })


app.use('/', customerRouter);
app.use('/', debugRouter)

app.use((error: Error, req: any, res: any, next: NextFunction) => {
    logger.fatal('INTERNAL SERVER ERROR', error)
    res.status(500).json(error)
    next();
})

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})



