"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customers_1 = __importDefault(require("../controllers/customers"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const customerRouter = express_1.default.Router();
customerRouter.get('/api/customers', jsonParser, customers_1.default.getCustomers);
customerRouter.post('/api/customers', jsonParser, customers_1.default.insertCustomers);
exports.default = customerRouter;
