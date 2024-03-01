import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    detail: String,
    storeName: String,
    storeImage: String,
    userName: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const comment = mongoose.model('comment', commentSchema);
export default comment;