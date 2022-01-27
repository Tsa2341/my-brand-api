import express from 'express'
import ArticleControllers from '../../controllers/articleControllers'

const route = express.Router()

route.post('/', async (req, res, next) => {

    const result = await new ArticleControllers().createArticle(req, res, next);

    if (result && result._id) {
        res.status(200).json({ status: 200, message: "this will save an article", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.get('/', async (req, res, next) => {
    const result = await new ArticleControllers().getAllArticles(req, res, next);

    if (result && result[0] && result[0]._id) {
        res.status(200).json({ status: 200, message: "this will return all articles", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.get('/:id', async (req, res, next) => {
    const result = await new ArticleControllers().getArticle(req, res, next);

    if (result && result._id) {
        res.status(200).json({ status: 200, message: "this will return one article", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.patch('/:id', async (req, res, next) => {
    const result = await new ArticleControllers().updateArticle(req, res, next);

    if (result && result._id) {
        res.status(200).json({ status: 200, message: "this will update one article", data: result })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

route.delete('/:id', async (req, res, next) => {
    const result = await new ArticleControllers().deleteArticle(req, res, next);

    if (result && result === true) {
        res.status(200).json({ status: 200, message: "this will delete one article", data: `deleted ${req.params.id}  successfully ` })
    } else {
        res.status(404).json({ status: 404, message: result, data: '' })
    }
})

export default route
