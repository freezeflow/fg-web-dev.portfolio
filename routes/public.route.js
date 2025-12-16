import express from 'express';
import featuredController from "../controllers/featured.controller.js";

const publicRouter = express.Router();
const featuredCtr = new featuredController();

publicRouter.get("/", featuredCtr.getAllFeatured);

export default publicRouter