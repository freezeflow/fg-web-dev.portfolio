import express from 'express';
import {sendEmailCtr, getAllFeatured} from "../controllers/public.controller.js"

const publicRouter = express.Router();

publicRouter.get("/", getAllFeatured);
publicRouter.post("/email", sendEmailCtr)

export default publicRouter