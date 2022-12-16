import {Request, Response, NextFunction} from 'express';
// import {apiErrorHandler} from './../handlers/errorHandler';

import ApplyService from "../service/ApplyService";

export default class ApplyController {
    constructor() {
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await ApplyService.create(req.body)
            res.send("вернем айди новой заявки")
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            await ApplyService.get(req.body)
            res.send("id будет")
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
}