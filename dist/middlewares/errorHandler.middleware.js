"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorBreakdown_util_1 = __importDefault(require("../utils/errorBreakdown.util"));
const errorHandler = (error, req, res, next) => {
    const { status, message } = (0, errorBreakdown_util_1.default)(error);
    res.status(status).json({ message });
};
exports.default = errorHandler;
