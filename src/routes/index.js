import express from "express";
import { Controller } from "../controllers/index.js";
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Hello")
})

console.log("step1");

route.post("/upload-file", Controller.UploadFileController.uploadFile)

//user
route.post("/user/create", Controller.UserController.create)

export default route