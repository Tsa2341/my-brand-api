import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: Date,
    location: String
})

export default mongoose.model('QueryModel', schema);
