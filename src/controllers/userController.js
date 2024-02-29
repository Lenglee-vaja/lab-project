import { statusMessage } from "../config/index.js";
import { Models } from "../models/index.js";
import { SendError500, SendError400, SendSuccess } from "../service/respone.js";

class UserController {
    static async create (req, res) {
        try {
            if (!req.body) return SendError400(res, statusMessage.BAD_REQUEST)
            const user = await Models.user.create(req.body)
            return SendSuccess(res, statusMessage.SUCCESS, user)
        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
}

export default UserController