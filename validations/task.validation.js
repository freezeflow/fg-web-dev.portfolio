import { validators } from "./common.validators.js";
import validate from "../middleware/validate.middleware.js";

export const validateCreateTask = [
    validators.bodyString('title'),
    validators.bodyString('description'),
    validators.bodyDate('dueDate'),
    validate
];

export const validateGetAllTasks = [
    validators.queryString({field: 'filter', optional: true}),
    validate
];

export const validateUpdateStatus = [
    validators.paramObjectId('id'),
    validators.queryString('status'),
    validate
];

export const validateGetTaskByProject = [
    validators.paramObjectId('projectId'),
    validate
];

export const validateTaskId = [
    validators.paramObjectId('id'),
    validate
];

export const validateUpdateTask = [
    validators.paramObjectId('id'),
    validators.bodyString({field:'title', optional: true}),
    validators.bodyString({field:'description', optional: true}),
    validators.bodyDate({field:'dueDate', optional: true}),
    validate
];