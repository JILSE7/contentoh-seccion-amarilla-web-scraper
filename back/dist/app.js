"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var PORT = process.env.SERVER_PORT;
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
//Api prefix
app.use('/api/restaurant', router_1.default);
app.listen(PORT, function () {
    console.log("App listen por el puerto", PORT);
});
