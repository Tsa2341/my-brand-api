import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    comments: { 
        type: [{
            description: String,
            date: Date,
        }],
        required: false
    },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
})

export default mongoose.model('ArticleModel', schema);
