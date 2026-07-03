/**
 * Workspace Flow — Identity Joi Schemas
 * @author Abdelfatah
 * Joi validation schemas for identity (auth + user) operations.
 */

const Joi = require('joi');

const enrollmentSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Name must be a text value',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least {#limit} characters',
      'string.max': 'Name cannot exceed {#limit} characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(100).required().messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least {#limit} characters',
      'string.max': 'Password cannot exceed {#limit} characters',
      'any.required': 'Password is required',
    }),
  }),
};

const credentialSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(1).required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
  }),
};

const profileUpdateSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(50).messages({
      'string.base': 'Name must be a text value',
      'string.min': 'Name must be at least {#limit} characters',
      'string.max': 'Name cannot exceed {#limit} characters',
    }),
    email: Joi.string().email().messages({
      'string.email': 'Please provide a valid email address',
    }),
  }).min(1),
};

module.exports = {
  enrollmentSchema,
  credentialSchema,
  profileUpdateSchema,
};
