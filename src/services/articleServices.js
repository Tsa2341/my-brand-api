import ArticleModel from "../models/articleModel.js";

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
      if (article === null) {
        throw { message: `Article ${id} can't be found` };
      }
      return article;
    } catch (error) {
      throw error;
    }
  }
  async updateArticle(id, data, image, res) {
    try {
      const article = await ArticleModel.findOne({ _id: id });

      if (article === null) throw { message: `Article ${id} can't be found` };

      article.title = data.title || article.title;
      article.description = data.description || article.description;
      article.image = image && image !== "no image" ? image : article.image;

      await article.save();
      return article;
    } catch (error) {
      throw { message: `Article ${id} can't be found` };
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
  async getLikes(id) {
    try {
      const result = await ArticleModel.findById({ _id: id });
      return { likes: result.likes, dislikes: result.dislikes };
    } catch (error) {
      throw error;
    }
  }
  async updateLikes(id, data) {
    try {
      const result = await ArticleModel.findById({ _id: id });
      if (data.likes) result.likes = data.likes;
      if (data.dislikes) result.dislikes = data.dislikes;
      await result.save();
      return { likes: result.likes, dislikes: result.dislikes };
    } catch (error) {
      throw error;
    }
  }

  // comments

  async getcomments(req, res, next) {
    try {
    } catch (error) {
      throw error;
    }
  }
  async createComments(req, res, next) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
