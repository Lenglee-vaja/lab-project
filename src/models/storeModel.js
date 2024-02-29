import mongoose from "mongoose";
const { Schema } = mongoose;
const storeSchema = new Schema({
    storeName: String,
    image: String,
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

const store = mongoose.model('store', storeSchema);
export default store;