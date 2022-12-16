import {Application, urlencoded, json} from 'express';
import cors from 'cors';
import Routes from './routes';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    public config(app: Application): void {
        app.use(urlencoded({extended: true}));
        app.use(json());
        app.use(cors());
    }
}

process.on('beforeExit', function (err) {
    console.error(err);
});