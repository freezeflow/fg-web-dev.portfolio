import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateCreateClient = [
  validators.bodyString('name'),
  validators.email('email'),
  validators.bodyString('phone'),
  validators.bodyString('company'),
  validators.bodyString('location'),
  validators.bodyObjectIdArray({field: 'projects', optional: true}),
  validators.bodyEnums({field: 'status', values: ['active', 'pending'], optional: true}),
  validate
];

export const validateClientLogin = [
  validators.email('email'),
  validators.bodyString('pin'),
  validate
];

export const validateGetClient = [
  validators.paramObjectId('id'),
  validators.queryString({field: 'fields', optional: true}),
  validate
];

export const validateUpdateClient = [
  validators.paramObjectId('id'),
  validators.bodyString({field: 'name', optional: true}),
  validators.email({field: 'email', optional: true}),
  validators.bodyString({field: 'phone', optional: true}),
  validators.bodyString({field: 'company', optional: true}),
  validators.bodyString({field: 'location', optional: true}),
  validators.bodyEnums({field: 'status', values: ['active', 'pending'], optional: true}),
  validators.bodyObjectIdArray({field: 'projects', optional: true}),
  validate
];

export const validateGetClientsByProjectIds = [
  validators.queryObjectIdArray('projectIds'),
  validators.queryString({field: 'fields', optional: true}),
  validate
];

export const validateUpdateClientStatus = [
  validators.paramObjectId('id'),
  validators.queryEnums('status', ['active', 'pending']),
  validate
];

export const validateAddProjectsToClient = [
  validators.paramObjectId('id'),
  validators.bodyObjectId('projects'),
  validate
];

export const validateDeleteClient = [
  validators.paramObjectId('id'),
  validate
];

export const validateGetAllClients = [
  validators.queryString({field: 'fields', optional: true}),
  validate
];