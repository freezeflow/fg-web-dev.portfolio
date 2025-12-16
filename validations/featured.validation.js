import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateCreateFeatured = [
    validators.bodyString('title'),
    validate
];

export const validateUpdateFeatured = [
    validators.paramObjectId('id'),
    validators.bodyString({field: 'title', optional: true}),
    validators.bodyString({field: 'description', optional: true}),
    validators.bodyString({field: 'company', optional: true}),
    validators.bodyString({field: 'role', optional: true}),
    validators.bodyLink({field: 'link', optional: true}),
];

export const validateId = [
    validators.paramObjectId('id')
];