"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainConfig = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    db: {
        url: process.env.DATABASE_URL,
    },
};
exports.default = mainConfig;
