import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from "./config.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Automatically handles image vs video detection.
 * - Videos → projects/videos
 * - Images → client/uploads
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const isImage = file.mimetype.startsWith("image/");

    if (!isVideo && !isImage) {
      throw new Error("Invalid file type — only images or videos allowed");
    }

    return {
      folder: isVideo ? "projects/videos" : "client/uploads",
      resource_type: isVideo ? "video" : "image",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      allowed_formats: isVideo
        ? ["mp4", "mov", "webm"]
        : ["jpg", "jpeg", "png"],

      transformation: isVideo
        ? [{ duration: 15 }] // optional: trim videos
        : [{ quality: "auto", fetch_format: "auto" }],
    };
  },
});

export { cloudinary, storage };