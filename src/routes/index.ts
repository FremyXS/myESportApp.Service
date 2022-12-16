import {Application} from 'express';
import applyRouter from './ApplyRouter';

export default class Routes {
    constructor(app: Application) {
        app.use('/apply', applyRouter);
    }
}
