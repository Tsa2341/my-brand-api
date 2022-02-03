import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, default: 'created_at' },
    comments: { 
        type: [{
            description: String,
            date: Date,
        }],
        required: false
    },
    likes: { type: Number,default: 0, required: false },
    dislikes: { type: Number, default: 0, required: false },
})

export default mongoose.model('ArticleModel', schema);
