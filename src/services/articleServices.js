import ArticleModel from '../models/articleModel.js'

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
                throw `Article ${id} can't be found`;
            }
            return article;
        } catch (error) {
            throw error
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
            throw error;
        }
    }
    async deleteArticle(id) {
        try {
            await ArticleModel.deleteOne({ _id: id })
            return true;
        } catch (error) {
            throw error;
        }
    }
}
