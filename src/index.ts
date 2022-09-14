import 'dotenv/config';
import express, { NextFunction } from 'express'
import customerRouter from './routers/customers'
import debugRouter from './routers/debug';
import { MonitoringService } from './adapters/monitoring/monitoring.service'

const monitoring = new MonitoringService()

const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})

app.use('/', customerRouter);
app.use('/', debugRouter)

app.use((error: Error, req: any, res: any, next: NextFunction) => {
    monitoring.fatal("INTERNAL SERVER ERROR", { request: req, response: res })
    res.status(500).json(error)
    next();
})

app.use((req, res) => {
    res.status(404)
})



