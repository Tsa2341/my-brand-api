import QueryModel from '../models/queryModel'

export default class QueryServices {

    async createQuery(data) {
        try {
            const query = new QueryModel(data);
            await query.save();
            return query;
        } catch (error) {
            return error;
        }
    }

    async getAllQuerys() {
        try {
            const querys = await QueryModel.find();
            return querys;
        } catch (error) {
            return error;
        }
    }
    // async getQuery(id) {
    //     try {
    //         const query = await QueryModel.findOne({ _id: id });
    //         return query;
    //     } catch (error) {
    //         return error;
    //     }
    // }
    // async updateQuery(id, data, image) { 
    //     try {
    //         const query = await QueryModel.findOne({ _id: id });
    
    //         query.title = data.title || query.title;
    //         query.description = data.description || query.description;
    //         query.image = image || query.image;
    
    //         await query.save();
    //         return query;
    //     } catch (error) {
    //         return error;
    //     }
    // }
    async deleteQuery(id) {
        try {
            await QueryModel.deleteOne({ _id: id })
            return true;
        } catch (error) {
            return error;
        }
    }

    async deleteAllQuery() {
        try {
            await QueryModel.deleteMany({})
            return true;
        } catch (error) {
            return error;
        }
    }

}