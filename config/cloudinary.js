import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET} from './config.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = (use) => {
  if (use === "projects") {
    return new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "project/uploads",
        allowed_formats: ["jpg", "png", "jpeg"], // restrict to images
      },
    });
  } else if (use === "clients") {
    return new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "client/uploads",
        resource_type: "raw",
      },
    });
  } else {
    throw new Error(`Unknown storage type: ${use}`);
  }
};

export { cloudinary, storage };