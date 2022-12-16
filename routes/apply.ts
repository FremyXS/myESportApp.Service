import {body, query} from 'express-validator'
import {check} from '../controllers/sender-invalid-req-error'

const Router = require('express')
const apply_router = new Router()

const apply = require('../controllers/apply')

apply_router.get('/',
    query('week').isInt({min: 0}),
    query('variant_id').isInt({min: 1}),
    check,
    apply.getSchedule)

apply_router.post('/',
    body('variant_id').isInt(),
    body('phone').isMobilePhone('ru-RU', {}),
    body('requests').isArray(),
    body('requests.*.date').isString(),
    body('requests.*.start').isString(),
    body('requests.*.end').isString(),
    body('requests.*.price').isInt(),
    check,
    apply.create)

module.exports = apply_router