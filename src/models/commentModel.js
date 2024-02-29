import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    detail: String,
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
});

const comment = mongoose.model('comment', commentSchema);
export default comment;