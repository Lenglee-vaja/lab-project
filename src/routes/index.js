import express from "express";
import { Controller } from "../controllers/index.js";
import { VerifyToken } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Hello")
})

console.log("step1");

route.post("/upload-file", Controller.UploadFileController.uploadFile)

//auth
route.post("/auth/register", Controller.AuthController.register)
route.post("/auth/login", Controller.AuthController.login)

//store
route.post("/store/create", Controller.StoreController.create)
route.get("/store/getMany", Controller.StoreController.getMany)
route.get("/store/get/:id", Controller.StoreController.getOne)

//comment
route.post("/comment/create", Controller.CommentController.create)
route.get("/comment/getMany", Controller.CommentController.getMany)
route.get("/comment/get/:id", Controller.CommentController.getOne)



//user
route.post("/user/create", Controller.UserController.create)

export default route