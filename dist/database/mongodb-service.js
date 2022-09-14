"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDbService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class mongoDbService {
    Init() {
        mongoose_1.default
            .connect(`${process.env.MONGO_URI}`, {})
            .then(result => {
            console.log(`MongoDB connected!`);
        })
            .catch(error => {
            console.log(error);
        });
    }
}
exports.mongoDbService = mongoDbService;
