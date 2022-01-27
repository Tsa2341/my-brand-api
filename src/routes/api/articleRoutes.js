import express from 'express'
import ArticleControllers from '../../controllers/articleControllers'

const route = express.Router()

route.post('/', async (req, res, next) => {

    console.log("error = " ,req.error)
    console.log("body = ", req.body);
    console.log("image = ", req.file);

    try {
        const result = await new ArticleControllers().createArticle(req, res, next);
        console.log("in articleRoutes = ", result);

        if (!result.errors) {
            res.status(200).json({ status: 200, message: "this will return all articles", data: result })
        } else {
            res.status(404).json({ status: 404, message: result, data: '' })
        }
    } catch (error) {
        res.status(404).json({ status: 404, message: error, data: '' })
    }
})

export default route
