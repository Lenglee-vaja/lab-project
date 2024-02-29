import { statusMessage } from "../config/index.js";
import { Models } from "../models/index.js";
import { SendError500, SendError400, SendSuccess } from "../service/respone.js";

class StoreController {
    static async create (req, res) {
        try {
            if (!req.body) return SendError400(res, statusMessage.BAD_REQUEST)
            const store = await Models.store.create(req.body)
            return SendSuccess(res, statusMessage.SUCCESS, store)
        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }

    static async getMany(req, res) {
        try {
            const store = await Models.store.find()
            return SendSuccess(res, statusMessage.SUCCESS, store)
        } catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
    static async getOne(req, res) {
        try {
            const store = await Models.store.findById(req.params.id)
            return SendSuccess(res, statusMessage.SUCCESS, store)
            
        }catch (error) {
            console.log("errr=========>", error);
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
}

export default StoreController