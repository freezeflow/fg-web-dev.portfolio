import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateRegister = [
    validators.email('email'),
    validators.bodyString('username'),
    validators.bodyString('password'),
    validate
];

export const validateAdminUpdate = [
    validators.paramObjectId('id'),
    validators.bodyString({field: 'username', optional: true}),
    validators.email({field: 'email', optional: true}),
    validators.bodyString({field: 'password', optional: true}),
    validate
];

export const validateAdminId = [
    validators.paramObjectId('id'),
    validate
];