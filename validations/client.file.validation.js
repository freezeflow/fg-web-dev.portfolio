import { validators } from "./common.validators.js";
import validate from "../middleware/validate.middleware.js";

export const validateId = [
    validators.paramObjectId('id'),
    validate
];

export const validateFilename = [
    validators.paramString('filename'),
    validate
]