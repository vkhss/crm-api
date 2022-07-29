import express from 'express'
import customersController from '../controllers/customers';
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const customerRouter = express.Router();

customerRouter.get('/', jsonParser, customersController.getCustomers)
customerRouter.post('/', jsonParser, customersController.insertCustomers)


export default customerRouter