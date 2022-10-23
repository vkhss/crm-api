import 'dotenv/config';
import express, { NextFunction } from 'express'
import ElasticApmAgent from 'elastic-apm-node';
import customerRouter from './routers/customers'
import debugRouter from './routers/debug';
import { logger } from './instances';

const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

logger.startMonitoring()

ElasticApmAgent.start({ captureSpanStackTraces: false });

app.use(ElasticApmAgent.middleware.connect());

app.use('/', customerRouter);
app.use('/', debugRouter)

app.use((error: Error, req: any, res: any, next: NextFunction) => {
    res.status(500).json(error)
    next();
})

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})



