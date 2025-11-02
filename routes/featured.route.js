import express from "express";
import featuredController from "../controllers/featured.controller.js";

import { validateAddFeatured } from "../validations/featured.validation.js";

const featuredRouter = express.Router();
const featuredCtr = new featuredController();

featuredRouter.post("/", validateAddFeatured, featuredCtr.addFeatured);

featuredRouter.get("/", featuredCtr.getFeatured);

export default featuredRouter