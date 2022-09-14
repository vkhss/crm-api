"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fieldValidator = (params, mandatoryFields) => {
    try {
        let missing = [];
        let fields = [];
        for (let prop in params) {
            fields.push(prop);
        }
        for (const mandatoryfield of mandatoryFields) {
            if (!fields.includes(mandatoryfield)) {
                missing.push(mandatoryfield);
            }
        }
        if (missing.length > 0) {
            let missingFields = missing.join(',');
            throw `Mandatory fields are missing ${missingFields}`;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.default = { fieldValidator };
