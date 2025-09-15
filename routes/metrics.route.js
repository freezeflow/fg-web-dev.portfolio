import { getAggregate } from "../controllers/metrics.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import express from 'express'

const metricsRouter = express.Router()

metricsRouter.get('/', authenticate, getAggregate)

export default metricsRouter