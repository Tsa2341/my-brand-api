import express from 'express'
import ArticleControllers from '../../controllers/articleControllers'

const route = express.Router({mergeParams: true})

route.get('/', async (req, res, next) => {
    new ArticleControllers().getLikes(req, res, next)
})

route.patch('/', async (req, res, next) => {
    new ArticleControllers().updateLikes(req, res, next)
})

export default route
