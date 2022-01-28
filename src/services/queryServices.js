import QueryModel from '../models/queryModel'

export default class QueryServices {

    async createQuery(data) {
        try {
            const query = new QueryModel(data);
            await query.save();
            return query;
        } catch (error) {
            throw error;
        }
    }

    async getAllQuerys() {
        try {
            const querys = await QueryModel.find();
            return querys;
        } catch (error) {
            throw error;
        }
    }
    async deleteQuery(id) {
        try {
            await QueryModel.deleteOne({ _id: id })
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllQuery() {
        try {
            await QueryModel.deleteMany({})
            return true;
        } catch (error) {
            throw error;
        }
    }
}