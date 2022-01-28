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
    
            res.status(201).json({ status: 201, message: "this will save an article", data: result })
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't create the article", data: '' })
        }
    }
    
    async getAllArticles(req, res, next) { 
        try {
            const results = await this.services.getAllArticles();
            res.status(200).json({ status: 200, message: "this will return all articles", data: results })
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't create get the articles", data: '' })
        }
    }
    async getArticle(req, res, next) {
        try {
            const result = await this.services.getArticle(req.params.id);
            res.status(200).json({ status: 200, message: "this will return one article", data: result })
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't create get the article", data: '' })
        }
    }
    async updateArticle(req, res, next) {
        try {
            const image = (req.file && req.file.path) ? req.file.path : "no image";
            const result = await this.services.updateArticle(req.params.id, req.body, image);
            res.status(201).json({ status: 201, message: "this will update one article", data: result })
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't update the article", data: '' })
        }
    }
    async deleteArticle(req, res, next) { 
        try {
            const result = await this.services.deleteArticle(req.params.id);
            res.status(200).json({ status: 200, message: "this will delete one article", data: result })
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't delete the article", data: '' })
        }
    }

    // likes

    async getLikes(req, res, next) {
        try {
            const result = await this.services.getLikes(req.params.id)
            res.status(200).json({status: 200, message: "this will get likes of an article", data: result})
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't get the likes", data: '' })
        }
    }
    async updateLikes(req, res, next) {
        try {
            const result = await this.services.updateLikes(req.params.id, req.body)
            res.status(200).json({status: 200, message: "this will save new likes of an article", data: result})
        } catch (error) {
            res.status(404).json({ status: 404, message: error.message || "couldn't update the likes", data: '' })
        }
    }

    // comments

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
