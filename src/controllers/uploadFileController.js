import { statusMessage } from "../config/index.js";
import Cloudinary from "../middleware/uploadFileMiddleware.js";
import { SendError400, SendError500, SendSuccess } from "../service/respone.js";

class UploadFileController {
  static async uploadFile(req, res) {
    try {
      const files = req.files;
      if (!files) {
        // Handle the case where no files or image is provided
        return SendError400(res, statusMessage.BAD_REQUEST, "No image provided");
      }
      const img = files.image.data.toString('base64')
      const imgName = files.image.name.split(".")[0]
      
      const Cloud = new Cloudinary(); // Assuming Cloudinary is properly implemented
      const url = await Cloud.uploadImage(img, imgName);

      return SendSuccess(res, statusMessage.SUCCESS, url);
    } catch (error) {
      console.log(`err: `, error);
      return SendError500(res, ErMessage.SERVER_ERROR, error);
    }
  }
}

export default UploadFileController