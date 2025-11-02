import { validators } from "./common.validators.js";
import validate from "../middleware/validate.middleware.js";

export const validateCreateProject = [
    validators.bodyString('title'),
    validators.bodyString('description'),
    validators.bodyString('type'),
    validators.bodyStringArray('tech'),
    validate
];

export const validateUpdateProject = [
    validators.paramObjectId('id'),
    validators.bodyString({field: 'title', optional: true}),
    validators.bodyString({field: 'summary', optional: true}),
    validators.bodyString({field: 'type', optional: true}),
    validators.bodyStringArray({field: 'tech', optional: true}),
    validators.bodyBoolean({field: 'featured', optional: true}),
    validators.bodyBoolean({field: 'complete', optional: true}),
    validators.bodyDate({field: 'dateCompleted', optional: true}),
    validate
];

export const validateId = [
    validators.paramObjectId('id'),
    validate
];

export const validateGetProjects = [
    validators.queryString({field: 'fields', optional: true}),
    validate
];

export const validateGetProject = [
    validators.paramObjectId('id'),
    validators.queryString({field: 'fields', optional: true}),
    validate
];

export const validateSendEmail = [
    validators.email('email'),
    validators.bodyString('title'),
    validators.bodyString('name'),
    validators.queryString({field: 'fields', optional: true}),
    validate
];