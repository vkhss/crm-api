"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = __importDefault(require("../models/customers"));
const utils_validator_1 = __importDefault(require("../utils/utils.validator"));
const getCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    customers_1.default.find(req.query)
        .exec()
        .then(results => {
        return res.status(200).json({ results });
    })
        .catch(error => res.status(500).json({
        message: error.message,
        error
    }));
});
const insertCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mandatoryFields = ['cpf', 'firstName', 'lastName', 'birthDate', 'address', 'city', 'country'];
        yield utils_validator_1.default.fieldValidator(req.body, mandatoryFields);
        const { cpf, firstName, lastName, birthDate, address, city, country } = req.body;
        let cpfExists = false;
        yield customers_1.default.findOne({ cpf })
            .exec()
            .then(results => {
            if (results) {
                cpfExists = true;
            }
        }).catch(error => {
            return res.status(500).json(error);
        });
        if (cpfExists) {
            return res.status(500).json({
                message: 'CPF alrealdy exists!'
            });
        }
        const newCustomer = new customers_1.default({
            cpf,
            firstName,
            lastName,
            birthDate,
            address,
            city,
            country
        });
        yield newCustomer
            .save()
            .then(result => {
            return res.status(201).json({ "msg": "Customer successfuly created!" });
        })
            .catch(error => res.status(500).json({
            message: error.message,
            error
        }));
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.default = { getCustomers, insertCustomers };
