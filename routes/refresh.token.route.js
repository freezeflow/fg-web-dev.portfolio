import express from 'express';
import refreshTokenController from '../controllers/refresh.token.controller.js';

const refreshRouter = express.Router();

// POST endpoint for refreshing tokens
refreshRouter.post('/', refreshTokenController);

export default refreshRouter;
