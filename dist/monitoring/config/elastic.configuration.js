"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'serverUrl': process.env.ELASTIC_APM_SERVER_URL,
    'secretToken': process.env.ELASTIC_APM_SECRET_TOKEN,
    'serviceName': process.env.ELASTIC_APM_SERVICE_NAME,
    'environment': process.env.ELASTIC_APM_ENVIRONMENT,
    'usePathAsTransactionName': true
};
