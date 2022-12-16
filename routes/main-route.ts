import {Router} from "express"
const api_router = Router()

const apply = require('./apply')

api_router.use('/apply', apply)

module.exports = api_router