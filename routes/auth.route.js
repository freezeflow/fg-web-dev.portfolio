import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";
import { validateLogout, validateSignIn, validateSignUp } from "../validations/auth.validation.js";

const authRouter = Router();
const authControl = new authController();

const limitter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many attemps, please try again later"}
});

authRouter.post('/sign-up', validateSignUp, limitter, authControl.registerAdmin);

authRouter.post('/sign-in', validateSignIn, limitter, authControl.loginAdmin);

authRouter.patch('/logout/:id', validateLogout, limitter, authControl.logoutAdmin);

export default authRouter