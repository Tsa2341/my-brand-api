import mongoose from "mongoose";

const schema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: new Date().toISOString() },
});

export default mongoose.model('QueryModel', schema);
