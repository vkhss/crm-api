"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("../controllers/debug"));
const debugRouter = express_1.default.Router();
debugRouter.post('/api/debug', debug_1.default.postDebug);
debugRouter.get('/api/debug', debug_1.default.getDebug);
exports.default = debugRouter;
