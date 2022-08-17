import express from 'express'
import bodyParser from 'body-parser'

const debugRouter = express.Router();

debugRouter.post('/api/debug-sentry', () => {
        throw new Error('Debug Sentry')

})

export default debugRouter