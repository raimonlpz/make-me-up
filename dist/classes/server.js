"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    //public port: number = 3000;
    constructor() {
        //leer localhost de variables y puertp
        this.host = process.env.host || '0.0.0.0';
        // port = process.env.PORT || 3000;
        this.port = process.env.port || 3000;
        this.app = express_1.default();
    }
    start(callback) {
        this.app.listen(Number(this.port), this.host, callback);
    }
}
exports.default = Server;
