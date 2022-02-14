import express from 'express'
import ArticleControllers from '../../controllers/articleControllers'
import { commentValidation } from "../../validations/commentValidation/comment.validation";

const route = express.Router({ mergeParams: true });

route.post("/", commentValidation, async (req, res, next) => {
  new ArticleControllers().createComment(req, res, next);
});

route.get("/", async (req, res, next) => {
  new ArticleControllers().getComments(req, res, next);
});

export default route

