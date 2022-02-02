import express from 'express'
import likeRoutes from './likeRoutes'
import commentRoutes from './commentRoutes'
import ArticleControllers from '../../controllers/articleControllers'
import { authenticate } from '../../middlewares/authenticate'
import { articleValidation } from '../../validations/articleValidation/article.validation'

const route = express.Router({mergeParams: true})

route.post('/', authenticate, articleValidation, (req, res, next) => {
    new ArticleControllers().createArticle(req, res, next);
})

route.get('/', (req, res, next) => {
    new ArticleControllers().getAllArticles(req, res, next);
})

route.get('/:id', (req, res, next) => {
    new ArticleControllers().getArticle(req, res, next);
})

route.patch('/:id', authenticate, articleValidation, (req, res, next) => {
    new ArticleControllers().updateArticle(req, res, next);
})

route.delete('/:id', authenticate, (req, res, next) => {
    new ArticleControllers().deleteArticle(req, res, next);
})

route.use('/:id/likes', likeRoutes);

route.use('/:id/comments', commentRoutes);


export default route
