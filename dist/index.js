"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const main_config_1 = __importDefault(require("./configs/main.config"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hay");
});
app.use(errorHandler_middleware_1.default);
app.listen(main_config_1.default.app.port, (error) => {
    if (error)
        return console.error(`Failed to run app:`, error);
    console.log(`App is running on port: ${main_config_1.default.app.port}`);
});
