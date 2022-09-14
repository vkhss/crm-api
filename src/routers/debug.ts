import express from 'express'
import debugController from '../controllers/debug';

const debugRouter = express.Router();

debugRouter.post('/api/debug', debugController.postDebug)
debugRouter.get('/api/debug', debugController.getDebug)

export default debugRouter