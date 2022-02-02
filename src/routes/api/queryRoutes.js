import express from 'express'
import QueryControllers from '../../controllers/queryControllers'
import {authenticate} from "../../middlewares/authenticate"
import { queryValidation } from '../../validations/queryValidation/query.validation'

const route = express.Router()

route.post('/', queryValidation, (req, res, next) => {
    new QueryControllers().createQuery(req, res, next);
})

route.get('/', authenticate, (req, res, next) => {
    new QueryControllers().getAllQuerys(req, res, next);
})

route.delete('/:id', authenticate, (req, res, next) => {
    new QueryControllers().deleteQuery(req, res, next);
})

route.delete('/', authenticate, (req, res, next) => {
    new QueryControllers().deleteAllQuery(req, res, next);
})

export default route
