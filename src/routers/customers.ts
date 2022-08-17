import express from 'express'
import customersController from '../controllers/customers';
import bodyParser from 'body-parser'
import apmMiddleware from '../middlewares/get-user-info-apm'

const jsonParser = bodyParser.json()

const customerRouter = express.Router();

customerRouter.get('/api/customers', jsonParser, customersController.getCustomers)
customerRouter.post('/api/customers', jsonParser, apmMiddleware.getUserCpfApm, customersController.insertCustomers)


export default customerRouter