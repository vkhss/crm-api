"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticAPMService = void 0;
const elastic_apm_node_1 = __importDefault(require("elastic-apm-node"));
class ElasticAPMService {
    init() {
        try {
            elastic_apm_node_1.default.start({
                serviceName: 'crm-api-apm',
                serverUrl: process.env.ELASTIC_URL,
                secretToken: process.env.ELASTIC_TOKEN,
                environment: 'local'
            });
            console.log('Elastic APM Started!');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.ElasticAPMService = ElasticAPMService;
