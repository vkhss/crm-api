"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const customers_1 = __importDefault(require("./routers/customers"));
const debug_1 = __importDefault(require("./routers/debug"));
const error_capture_1 = require("./monitoring/interceptors/error.capture");
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOST}:${PORT}`);
});
app.use('/', customers_1.default);
app.use('/', debug_1.default);
app.use((error, req, res, next) => {
    new error_capture_1.ErrorInterceptor().captureError(error, req);
    next();
});
app.use((req, res) => {
    res.status(404);
});
