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

        console.log("in article controller = ",result)
        return result;
    }
    
    getAllArticles(req, res, next) { }
    getArticle(req, res, next) { }
    updateArticle(req, res, next) { }
    deleteArticle(req, res, next) { }
}
