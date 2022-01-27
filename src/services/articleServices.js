import ArticleModel from '../models/articleModel.js'

// import the model you need to access
export default class ArticleServices {

    async createArticle(data) {
        try {
            const article = new ArticleModel(data);
            await article.save();
            return article;
        } catch (error) {
            return error;
        }
    }

    async getAllArticles() {
        try {
            const articles = await ArticleModel.find();
            return articles;
        } catch (error) {
            return error;
        }
    }
    async getArticle(id) {
        try {
            const article = await ArticleModel.findOne({ _id: id });
            return article;
        } catch (error) {
            return error;
        }
    }
    async updateArticle(id, data, image) { 
        try {
            const article = await ArticleModel.findOne({ _id: id });
    
            article.title = data.title || article.title;
            article.description = data.description || article.description;
            article.image = image || article.image;
    
            await article.save();
            return article;
        } catch (error) {
            return error;
        }
    }
    async deleteArticle(id) {
        try {
            await ArticleModel.deleteOne({ _id: id })
            return true;
        } catch (error) {
            return error;
        }
    }
}
