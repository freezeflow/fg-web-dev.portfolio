import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateFilesId = [
    validators.paramObjectId('id'),
    validate
];

export const validateDownloadFile = [
    validators.paramString('filename'),
    validate
];

export const validateDeleteFile = [
    validators.bodyObjectId('id'),
    validate
];