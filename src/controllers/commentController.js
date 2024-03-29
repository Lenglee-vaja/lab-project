import { statusMessage } from "../config/index.js";
import { Models } from "../models/index.js";
import { SendError500, SendError400, SendSuccess } from "../service/respone.js";

class CommentController {
    static async create(req, res) {
        try {
            if (!req.body) return SendError400(res, statusMessage.BAD_REQUEST)
            const newData = {
                ...req.body,
            }
            const comment = await Models.comment.create(newData)
            return SendSuccess(res, statusMessage.SUCCESS, comment)
        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
    static async getMany(req, res) {
        try {
            const comments = await Models.comment.find().sort({ createdAt: -1 });
            return SendSuccess(res, statusMessage.SUCCESS, comments)
        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
    static async getOne(req, res) {
        try {
            const comment = await Models.comment.findById(req.params.id)
            return SendSuccess(res, statusMessage.SUCCESS, comment)

        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
}

export default CommentController