import queryServices from '../services/queryServices'

export default class QueryControllers {
    // TODO Don't access database from this file you only needs
    constructor() {
        this.services = new queryServices();
    }

    async createQuery(req, res, next) {
        const date = new Date().toLocaleString('en-GB', {
            year: "numeric",
            month: 'long',
            day: '2-digit',
            weekday: "long",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const result = await this.services.createQuery({
            description: req.body.description,
            location: req.body.location,
            date: date
        })
        return result;
    }
    
    async getAllQuerys(req, res, next) { 
        const results = await this.services.getAllQuerys();
        return results;
    }
    // async getQuery(req, res, next) { 
    //     const result = await this.services.getQuery(req.params.id);
    //     return result;
    // }
    // async updateQuery(req, res, next) { 
    //     const result = await this.services.updateQuery(req.params.id, req.body, req.file.path);
    //     return result;
    // }
    async deleteQuery(req, res, next) { 
        const result = await this.services.deleteQuery(req.params.id);
        return result;
    }

    async deleteAllQuery(req, res, next) { 
        const result = await this.services.deleteAllQuery();
        return result;
    }
}
