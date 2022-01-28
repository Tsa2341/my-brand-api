import express from 'express'
import likeRoutes from './likeRoutes'
import commentRoutes from './commentRoutes'
import ArticleControllers from '../../controllers/articleControllers'

const route = express.Router()

route.post('/', async (req, res, next) => {


    try {
        const result = await new ArticleControllers().createArticle(req, res, next);
        res.status(201).json({ status: 201, message: "this will save an article", data: result })
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' })
    }
})

route.get('/', async (req, res, next) => {
    try {
        const result = await new ArticleControllers().getAllArticles(req, res, next);
        res.status(200).json({ status: 200, message: "this will return all articles", data: result })
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' })
    }
})

route.get('/:id', async (req, res, next) => {
    
    try {
        const result = await new ArticleControllers().getArticle(req, res, next);
        res.status(200).json({ status: 200, message: "this will return one article", data: result })
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' });
    }
})

route.patch('/:id', async (req, res, next) => {
    try {
        const result = await new ArticleControllers().updateArticle(req, res, next);
        res.status(201).json({ status: 201, message: "this will update one article", data: result })
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' })
    }
})

route.delete('/:id', async (req, res, next) => {
    try {
        const result = await new ArticleControllers().deleteArticle(req, res, next);
        res.status(200).json({ status: 200, message: "this will delete one article", data: `deleted ${req.params.id}  successfully ` })
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' })
    }
})


route.use('/likes', likeRoutes);
route.use('/comments', commentRoutes);

export default route
