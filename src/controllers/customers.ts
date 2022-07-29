import {NextFunction, Request, Response} from 'express'
import CustomerModel from '../models/customers'
import utilsValidator from "../utils/utils.validator";

    const getCustomers = async(req: Request, res: Response, next: NextFunction) => {

        CustomerModel.find(req.query)
            .exec()
            .then(results => {
                return res.status(200).json({results})
            })
            .catch(error => res.status(500).json({
                message: error.message, 
                error
            }))
    }

    const insertCustomers = async (req: Request, res: Response, next: NextFunction) => {

        try{
            const mandatoryFields: Array<string> = ['cpf', 'firstName', 'lastName', 'birthDate', 'address', 'city', 'country']

            await utilsValidator.fieldValidator(req.body, mandatoryFields)
    
            const {cpf , firstName, lastName, birthDate, address, city, country} = req.body
            let cpfExists = false
    
            await CustomerModel.findOne({cpf})
                .exec()
                .then(results => {
                    if (results) {
                        cpfExists = true
                    }
                }).catch(error => {
                    return res.status(500).json(error);
                })
    
                if (cpfExists) {
                    return res.status(500).json({
                        message: 'CPF alrealdy exists!'
                    })
                }
    
                const newCustomer = new CustomerModel({
                    cpf,
                    firstName,
                    lastName,
                    birthDate, 
                    address,
                    city, 
                    country
                })
    
                await newCustomer
                    .save()
                    .then(result => {
                        return res.status(201).json({ "msg": "Customer successfuly created!" })
                    })
                    .catch(error => res.status(500).json({
                        message: error.message, 
                        error
                    }))
        }catch(error) {
            return res.status(400).json(error)
        }
    } 

export default {getCustomers, insertCustomers}

