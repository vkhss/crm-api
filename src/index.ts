import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import customerRouter from './routers/customers'
import debugRouter from './routers/debug';
import { ApmService } from './services/apm-service';
import { SentryService } from './services/sentry-service'
import { mongoDbService } from './services/mongodb-service'


new ApmService().Init()
new SentryService().Init()
new mongoDbService().Init()


const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

app.use(new SentryService().RequestHandler())


app.use(cors({
    origin: ['http://localhost:3000']
}))

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`)
})

app.use('/', customerRouter);
app.use('/', debugRouter)


app.use((req, res) => {
    res.status(404)
})

app.use(new SentryService().ErrorHandler())


