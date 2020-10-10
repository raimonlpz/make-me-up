"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_1 = __importDefault(require("./routes/post"));
// IMPORTART VARIABLES DE ENTORNO LOCALES
require('dotenv').config({ path: './variables.env' });
//console.log(process.env.DB_URL);
const server = new server_1.default();
// Middlewares
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default());
// server.app.use(fileUpload({useTempFiles: true}));
// CORS config
server.app.use(cors_1.default({ origin: true, credentials: true }));
// App routes
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// Conectar DB
mongoose_1.default.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('Database ONLINE');
});
// express
server.start(() => {
    console.log(`servidor corriendo en puerto ${server.port}`);
});
