import { body, query, param } from 'express-validator';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// --- Helper to normalize arguments ---
function normalizeArgs(args, extra = {}) {
  if (typeof args[0] === 'string') {
    return {
      field: args[0],
      message: args[1],
      optional: args[2] ?? false,
      ...extra
    };
  }
  return { optional: false, ...extra, ...args[0] };
}

// --- Helper to enforce "required" unless optional ---
function requiredCheck(optional, field, message) {
  return value => {
    if (!optional && (value === undefined || value === null || value === '')) {
      throw new Error(message || `${field} is required`);
    }
    return true;
  };
}

// --- Validators ---
export const validators = {
  bodyString: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isString().withMessage(`${field} must be a string`)
        .trim()
        .escape()
    ];
  },

  email: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isEmail().withMessage("Email is invalid")
        .normalizeEmail()
    ];
  },

  queryString: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      query(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isString().withMessage(`${field} must be a string`)
        .trim()
        .escape()
    ];
  },

  bodyStringArray: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(value => {
          if (!optional && (!Array.isArray(value) || value.length === 0)) {
            throw new Error(message || `${field} is required and must be an array`);
          }
          return true;
        })
        .optional(optional)
        .isArray().withMessage(`${field} must be an array`),

      body(`${field}.*`)
        .optional(optional)
        .isString().withMessage(`Each ${field} must be a string`)
        .trim()
        .escape()
    ];
  },

  queryObjectIdArray: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      query(field)
        .customSanitizer(value => {
          if (typeof value === 'string') return value.split(',').map(v => v.trim());
          return value;
        })
        .custom(value => {
          if (!optional && (!Array.isArray(value) || value.length === 0)) {
            throw new Error(message || `${field} is required`);
          }
          return true;
        })
        .optional(optional)
        .isArray().withMessage(`${field} must be an array`),

      query(`${field}.*`)
        .optional(optional)
        .matches(objectIdRegex).withMessage(message || `Each ${field} must be a valid MongoDB ObjectId`)
    ];
  },

  bodyObjectIdArray: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(value => {
          if (!optional && (!Array.isArray(value) || value.length === 0)) {
            throw new Error(message || `${field} is required and must be an array`);
          }
          return true;
        })
        .optional(optional)
        .isArray().withMessage(`${field} must be an array`),

      body(`${field}.*`)
        .optional(optional)
        .matches(objectIdRegex).withMessage(message || `Each ${field} must be a valid MongoDB ObjectId`)
    ];
  },

  bodyBoolean: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isBoolean().withMessage(`${field} must be a boolean value`)
        .toBoolean()
    ];
  },

  queryBoolean: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      query(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isBoolean().withMessage(`${field} must be a boolean value`)
        .toBoolean()
    ];
  },

  bodyBooleanArray: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(value => {
          if (!optional && (!Array.isArray(value) || value.length === 0)) {
            throw new Error(message || `${field} is required and must be an array`);
          }
          return true;
        })
        .optional(optional)
        .isArray().withMessage(`${field} must be an array`),

      body(`${field}.*`)
        .optional(optional)
        .isBoolean().withMessage(`Each ${field} must be a boolean value`)
        .toBoolean()
    ];
  },

  bodyDate: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isISO8601().withMessage(`${field} must be a date value`)
        .toDate()
    ];
  },

  bodyLink: (...args) => {
    const { field, message, optional } = normalizeArgs(args);
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isURL().withMessage(`Invalid url`)
    ];
  },

  paramObjectId: (...args) => {
    const { field, message } = normalizeArgs(args);
    return [
      param(field)
        .notEmpty().withMessage(`${field} is required`)
        .matches(objectIdRegex).withMessage(message || `${field} must be a valid MongoDB ObjectId`)
    ];
  },

  bodyObjectId: (...args) => {
    const { field, message } = normalizeArgs(args);
    return [
      body(field)
        .notEmpty().withMessage(`${field} is required`)
        .matches(objectIdRegex).withMessage(message || `${field} must be a valid MongoDB ObjectId`)
    ];
  },

  paramString: (...args) => {
    const { field, message } = normalizeArgs(args);
    return [
      param(field)
        .notEmpty().withMessage(`${field} is required`)
        .isString().withMessage(message || `${field} must be a string`)
    ];
  },

  bodyEnums: (...args) => {
    const { field, values = [], message, optional } = normalizeArgs(args, { values: [] });
    return [
      body(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isIn(values).withMessage(message || `${field} must be one of: ${values.join(', ')}`)
    ];
  },

  queryEnums: (...args) => {
    const { field, values = [], message, optional } = normalizeArgs(args, { values: [] });
    return [
      query(field)
        .custom(requiredCheck(optional, field, message))
        .optional(optional)
        .isIn(values).withMessage(message || `${field} must be one of: ${values.join(', ')}`)
    ];
  }
};
