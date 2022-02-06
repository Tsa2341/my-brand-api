import ArticleModel from "../models/articleModel.js";
import CommentModel from "../models/commentModel.js";

// import the model you need to access
export default class ArticleServices {
  async createArticle(data) {
    try {
      const article = new ArticleModel(data);
      await article.save();
      return article;
    } catch (error) {
      throw error;
    }
  }

  async getAllArticles() {
    try {
      const articles = await ArticleModel.find();
      return articles;
    } catch (error) {
      throw error;
    }
  }
  async getArticle(id) {
    try {
      const article = await ArticleModel.findOne({ _id: id });
      return article;
    } catch (error) {
      throw error;
    }
  }
  async updateArticle(id, data, image, res) {
    try {
      const article = await ArticleModel.findOne({ _id: id });
      console.log(article);
      article.title = data.title || article.title;
      article.description = data.description || article.description;
      article.image = image && image !== "no image" ? image : article.image;

      await article.save();
      return article;
    } catch (error) {
      throw error;
      // throw { message: `Article ${id} can't be found` };
    }
  }
  async deleteArticle(id) {
    try {
      const result = await ArticleModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // likes
  async getLikes(id, res) {
    try {
      const result = await ArticleModel.findById({ _id: id });
      if (!result) throw new Error("article not found");
      return { likes: result.likes, dislikes: result.dislikes };
    } catch (error) {
      throw { message: `Article ${id} can't be found` };
    }
  }
  async updateLikes(id, data, res) {
    try {
      const result = await ArticleModel.findById({ _id: id });
      if (!result) throw new Error("article not found");
      if (data.likes) result.likes = data.likes;
      if (data.dislikes) result.dislikes = data.dislikes;
      await result.save();
      return { likes: result.likes, dislikes: result.dislikes };
    } catch (error) {
      throw { message: `Article ${id} can't be found` };
    }
  }

  // comments

  async getComments(id, res) {
    try {
      const article = await ArticleModel.findOne({ _id: id });
      if (!article) throw new Error("article not found");
      return article.comments;
    } catch (error) {
      throw { message: `Article ${id} can't be found` };
    }
  }
  async createComment(data, id, res) {
    try {
      const article = await ArticleModel.findOne({ _id: id });
      if (!article) throw new Error("article not found");
      await article.comments.push({
        ...data,
        date: new Date().toISOString(),
      });
      await article.save();
      return article.comments.slice(-1);
    } catch (error) {
      throw { message: `Article ${id} can't be found` };
    }
  }
}
