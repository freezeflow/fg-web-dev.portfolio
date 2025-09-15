import { Router } from "express";
import clientsController from "../../controllers/client.controller.js";
import rateLimit from "express-rate-limit";
import { validateSignIn } from "../../validations/auth.validation.js";

const clientAuthRouter = Router();
const clientControl = new clientsController();

const logLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many attemps, please try again later"}
});

clientAuthRouter.post('/sign-in', validateSignIn, clientControl.loginClient);

clientAuthRouter.post('/logout', clientControl.logoutClient);

export default clientAuthRouter