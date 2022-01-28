import express from 'express'
import QueryControllers from '../../controllers/queryControllers'

const route = express.Router()

route.post('/', async (req, res, next) => {

    const result = await new QueryControllers().createQuery(req, res, next);

    if (result && result._id) {
        res.status(201).json({ status: 200, message: "this will save an query", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.get('/', async (req, res, next) => {
    const result = await new QueryControllers().getAllQuerys(req, res, next);

    if (result && result[0] && result[0]._id) {
        res.status(200).json({ status: 200, message: "this will return all querys", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

// route.get('/:id', async (req, res, next) => {
//     const result = await new QueryControllers().getQuery(req, res, next);

//     if (result._id) {
//         res.status(200).json({ status: 200, message: "this will return one query", data: result })
//     } else {
//         res.status(404).json({ status: 404, message: result, data: '' })
//     }
// })

// route.patch('/:id', async (req, res, next) => {
//     const result = await new QueryControllers().updateQuery(req, res, next);

//     if (result._id) {
//         res.status(200).json({ status: 200, message: "this will update one query", data: result })
//     } else {
//         res.status(404).json({ status: 404, message: result, data: '' })
//     }
// })

route.delete('/:id', async (req, res, next) => {
    const result = await new QueryControllers().deleteQuery(req, res, next);

    if (result && result === true) {
        res.status(204).json({ status: 200, message: "this will delete one query", data: `deleted ${req.params.id}  successfully ` })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.delete('/', async (req, res, next) => {
    const result = await new QueryControllers().deleteAllQuery(req, res, next);

    if (result && result === true) {
        res.status(204).json({ status: 200, message: "this will delete all querries", data: `deleted all querries  successfully ` })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

export default route
