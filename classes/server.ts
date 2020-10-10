import express from 'express';

export default class Server {
    public app : express.Application;

    //leer localhost de variables y puertp
    host = process.env.host || '0.0.0.0';
    // port = process.env.PORT || 3000;
    port = process.env.port || 3000;
    //public port: number = 3000;
    
    constructor() {
        this.app = express();
    }

    start(callback: () => void) {
        this.app.listen(Number(this.port), this.host, callback );
    }
}