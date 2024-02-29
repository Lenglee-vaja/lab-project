import bcrypt from "bcrypt"
import { statusMessage } from "../config/index.js"
import { GenerateToken } from "../middleware/authMiddleware.js"
import { SendError400, SendError401, SendError500, SendSuccess } from "../service/respone.js"
import { Models } from "../models/index.js"
// import { json } from "body-parser"

class AuthController {
    static async register(req, res) {
        try {
            const { phoneNumber, email, userName } = req.body
            if (!phoneNumber || !userName || !req.body.password){
                return SendError400(res, statusMessage.BAD_REQUEST)
            }
            
            //MEAN: Check if a user with the provided phone number or email already exists
            const checkExist = await Models.user.findOne({ $or: [{ phoneNumber }, { email }] });
            if (checkExist) {
                return res.status(400).json({ msg: statusMessage.USER_ALREADY_EXIST })
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            const newData = {
                ...req.body,
                password: hash,
            }

            //MEAN: Create User
            const user = await Models.user.create(newData)
            const payload = {
                _id: user._id,
                role: user.role
            }
            //MEAN: generate token
            const token = await GenerateToken(payload);
            
            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;
            const data = {
                ...others,
                accessToken: token.accessToken,
                refreshToken: token.refrehToken,
            };
            return SendSuccess(res, statusMessage.SUCCESS, data)
        } catch (error) {
            console.log({ error });
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
    static async login(req, res) {
        try {
            const { phoneNumber, password: passwordInput, email } = req.body;

            if ((!phoneNumber || !email) && !passwordInput) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const user = await Models.user.findOne({ $or: [{ phoneNumber }, { email }] });
            if (!user) {
                return res.status(400).json({ msg: statusMessage.USER_NOT_FOUND });
            }
            //MEAN: Compare password between login and register
            let comparePWD = await bcrypt.compare(passwordInput, user.password);
            if (!comparePWD) {
                return res.status(400).json({ msg: statusMessage.PASSWORD_NOT_MATCH });
            }

            const payload = {
                _id: user._id,
                role: user.role
            };
            //MEAN: Generate token
            const token = await GenerateToken(payload);
            //MEAN: Return user data without the password field
            const {password, ...others} = user._doc;
            const data = {
                ...others,
                accessToken: token.accessToken,
                refreshToken: token.refrehToken,
              };
            return SendSuccess(res, statusMessage.SUCCESS, data)
        } catch (error) {
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }

    static async adminLogin(req, res) {
        try {
            const { phoneNumber, password: passwordInput, email } = req.body;

            if ((!phoneNumber || !email) && !passwordInput) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const user = await Models.user.findOne({ $or: [{ phoneNumber }, { email }] });
            if (!user) {
                return res.status(400).json({ msg: statusMessage.USER_NOT_FOUND });
            }

            if (user.role == "TRETTER"){
                return SendError401(res, statusMessage.UNAUTHORIZED)
            }
            //MEAN: Compare password between login and register
            let comparePWD = await bcrypt.compare(passwordInput, user.password);
            if (!comparePWD) {
                return res.status(400).json({ msg: statusMessage.PASSWORD_NOT_MATCH });
            }

            const payload = {
                _id: user._id,
                role: user.role
            };
            //MEAN: Generate token
            const token = await GenerateToken(payload);
            //MEAN: Return user data without the password field
            const {password, ...others} = user._doc;
            const data = {
                ...others,
                accessToken: token.accessToken,
                refreshToken: token.refrehToken,
              };
            return SendSuccess(res, statusMessage.SUCCESS, data)
        } catch (error) {
            return SendError500(res, statusMessage.SERVER_ERROR, error)
        }
    }
}
export default AuthController