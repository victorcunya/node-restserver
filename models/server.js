
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { router } from '../routes/user.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // middleware; para servir carpeta publica
        // son funciones que siempre se ejecutan al levantar el server.
        this.middlewares();

        //rutas de aplicación.
        this.routes();
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // lectura y Parseo del body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use('/api/users', router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })

    }
}