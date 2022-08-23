
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { dbConnection } from '../database/config.js';
import {
    authRouter,
    userRouter
} from '../routes/index.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/users';
        this.authPath = '/api/auth';

        // connect to DB cafe
        this.connectDB();
        // middleware; para servir carpeta publica
        // son funciones que siempre se ejecutan al levantar el server.
        this.middlewares();

        //rutas de aplicación.
        this.routes();
    }

    async connectDB() {
        await dbConnection();
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
        this.app.use(this.userPath, userRouter);
        this.app.use(this.authPath, authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })

    }
}