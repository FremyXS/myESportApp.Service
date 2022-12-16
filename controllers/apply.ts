import {Request, Response} from "express";

const db_apply = require('../sql_requests/apply')

class Apply {
    async create(req: Request, res: Response) {
        try {
            await db_apply.create(req.body)
            res.send("вернем айди новой заявки")
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    async get(req: Request, res: Response) {
        try {
            await db_apply.get(req.body)
            res.send("id будет")
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
}

module.exports = new Apply()