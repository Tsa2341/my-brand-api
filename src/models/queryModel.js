import mongoose from "mongoose";

const schema = mongoose.Schema({
    description: { type: String, required: true },
    location: String,
    date: Date
})

export default mongoose.model('QueryModel', schema);
