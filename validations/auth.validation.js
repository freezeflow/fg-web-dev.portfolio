import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateSignUp = [
    validators.email('email'),
    validators.bodyString('name'),
    validators.bodyString('password'),
    validate
];

export const validateSignIn = [
    validators.email('email'),
    validators.bodyString('password'),
    validate
];

export const validateLogout = [
    validators.paramObjectId('id'),
    validate
];

export const validateEmail = [
    validators.email('email'),
    validate
];

export const validateResetPin = [
    validators.bodyString('pin'),
    validators.paramString('token'),
    validate
];