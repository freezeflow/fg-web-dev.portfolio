import express from "express";
import featuredController from "../controllers/featured.controller.js";
import { storage } from "../config/cloudinary.js";
import { 
  validateCreateFeatured, 
  validateUpdateFeatured,
  validateId 
} from "../validations/featured.validation.js";
import { authenticate, authorizeRole } from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer({storage});

const featuredRouter = express.Router();
const featuredCtr = new featuredController();

// CREATE — supports video + picture
featuredRouter.post(
    "/",
    upload.fields([
        { name: "file", maxCount: 1 },
        { name: "picture", maxCount: 1 }
    ]),
    validateCreateFeatured,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.createFeatured
);

// UPDATE — supports updating both video + picture
featuredRouter.patch(
    "/:id",
    upload.fields([
        { name: "file", maxCount: 1 },
        { name: "picture", maxCount: 1 }
    ]),
    validateUpdateFeatured,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.updateFeatured
);

// DELETE
featuredRouter.delete(
    "/:id",
    validateId,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.deleteFeatured
);

// GET one
featuredRouter.get(
    "/:id",
    validateId,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.getFeatured
);

// GET all
featuredRouter.get(
    "/",
    authenticate,
    authorizeRole("admin"),
    featuredCtr.getAllFeatured
);

export default featuredRouter;
