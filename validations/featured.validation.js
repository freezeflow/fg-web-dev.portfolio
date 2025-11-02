import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateAddFeatured = [
    validators.bodyObjectId('projectId'),
    validators.bodyString('role'),
    validators.bodyString({field: 'testimonial', optional: true}),
    validators.bodyLink({field: 'link', optional: true}),
    validate
];

