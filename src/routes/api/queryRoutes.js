import express from 'express'
import QueryControllers from '../../controllers/queryControllers'

const route = express.Router()

route.post('/',  (req, res, next) => {
    new QueryControllers().createQuery(req, res, next);
})

route.get('/', (req, res, next) => {
    new QueryControllers().getAllQuerys(req, res, next);
})

route.delete('/:id', (req, res, next) => {
    new QueryControllers().deleteQuery(req, res, next);
})

route.delete('/', (req, res, next) => {
    new QueryControllers().deleteAllQuery(req, res, next);
})

export default route
