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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
const sentry_service_1 = require("../adapters/sentry.service");
class ErrorService {
    constructor() {
        this.errorAdapters = [];
        this.sentryService = new sentry_service_1.SentryService();
        this.Adapters = [this.sentryService];
        this.errorAdapters.push(...this.Adapters);
    }
    captureError(error, requestContext, severity) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorAdapters.forEach((service) => {
                service.captureError(error, severity, requestContext);
            });
        });
    }
}
exports.ErrorService = ErrorService;
