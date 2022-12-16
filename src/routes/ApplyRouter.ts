import {body, query} from 'express-validator'
import {check} from '../handlers/senderRequestHandler'

import {Router} from 'express';
import ApplyController from "../controllers/ApplyController";

class ApplyRoutes {
    router = Router();
    applyController = new ApplyController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        // this.router.get('/',
        //     query('week').isInt({min: 0}),
        //     query('variant_id').isInt({min: 1}),
        //     check,
        //     this.applyController.getSchedule)

        this.router.post('/',
            body('variant_id').isInt(),
            body('phone').isMobilePhone('ru-RU', {}),
            body('requests').isArray(),
            body('requests.*.date').isString(),
            body('requests.*.start').isString(),
            body('requests.*.end').isString(),
            body('requests.*.price').isInt(),
            check,
            this.applyController.create)
    }
}

export default new ApplyRoutes().router;