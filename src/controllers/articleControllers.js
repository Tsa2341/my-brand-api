import articleServices from '../services/articleServices'

export default class ArticleControllers {
    // TODO Don't access database from this file you only needs
    constructor() {
        this.services = new articleServices();
    }

    async createArticle(req, res, next) {
        const image = (req.file && req.file.path) || req.error || '';
        // const error = req.error || '';
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
    }
    
    async getAllArticles(req, res, next) { 
        const results = await this.services.getAllArticles();
        return results;
    }
    async getArticle(req, res, next) { 
        const result = await this.services.getArticle(req.params.id);
        return result;
    }
    async updateArticle(req, res, next) { 
        const result = await this.services.updateArticle(req.params.id, req.body, req.file.path);
        return result;
    }
    async deleteArticle(req, res, next) { 
        const result = await this.services.deleteArticle(req.params.id);
        return result;
    }
}
