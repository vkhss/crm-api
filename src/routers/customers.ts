import express from 'express'
import customersController from '../controllers/customers';
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const customerRouter = express.Router();

customerRouter.get('/api/customers', jsonParser, customersController.getCustomers)
customerRouter.post('/api/customers', jsonParser, customersController.insertCustomers)

export default customerRouter