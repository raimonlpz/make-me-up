import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';
import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from "./routes/post";

// IMPORTART VARIABLES DE ENTORNO LOCALES
require('dotenv').config({path: './variables.env'});
//console.log(process.env.DB_URL);

const server = new Server();

// Middlewares
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload());
// server.app.use(fileUpload({useTempFiles: true}));

// CORS config
server.app.use(cors({ origin: true, credentials: true }));

// App routes
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar DB
mongoose.connect(`${process.env.DB_URL}`, 
                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
                    if(err) {
                        throw err;
                    }
                    console.log('Database ONLINE');
});

// express
server.start(() => {
    console.log(`servidor corriendo en puerto ${server.port}`);
});

