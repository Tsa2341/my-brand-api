import articleServices from '../services/articleServices'

export default class ArticleControllers {
    // TODO Don't access database from this file you only needs
    constructor() {
        this.services = new articleServices();
    }

    async createArticle(req, res, next) {
        try {
            const image = (req.file && req.file.path) || req.error || '';
            const date = new Date().toLocaleString('en-GB', {
                year: "numeric",
                month: 'long',
                day: '2-digit',
                weekday: "long",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
    
            const result = await this.services.createArticle({
                title: req.body.title,
                description: req.body.description,
                image: image,
                date: date,
            })
    
            return result;
        } catch (error) {
            throw error
        }
    }
    
    async getAllArticles(req, res, next) { 
        try {
            const results = await this.services.getAllArticles();
            return results;
        } catch (error) {
            throw error
        }
    }
    async getArticle(req, res, next) {
        try {
            const result = await this.services.getArticle(req.params.id);
            return result;
        } catch (error) {
            throw error
        }
    }
    async updateArticle(req, res, next) {
        try {
            const result = await this.services.updateArticle(req.params.id, req.body, req.file.path);
            return result;
        } catch (error) {
            throw error
        }
    }
    async deleteArticle(req, res, next) { 
        try {
            const result = await this.services.deleteArticle(req.params.id);
            return result;
        } catch (error) {
            throw error
        }
    }
    async getLikes(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
    async getDislikes(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
    async updateLikes(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
    async updateDislikes(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
    async getcomments(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
    async createComments(req, res, next) {
        try {} catch (error) {
            throw error
        }
    }
}
