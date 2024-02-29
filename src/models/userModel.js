import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    userName: String,
    phoneNumber: String,
    email: String,
    password: String,
    profile: String,
    role:{
        type: String,
        enum:["ADMIN","CUSTOMER"],
        default: "CUSTOMER"
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

const user = mongoose.model('user', userSchema);
export default user;