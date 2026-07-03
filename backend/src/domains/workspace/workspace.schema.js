/**
 * Workspace Flow — Workspace Joi Schemas
 * @author Abdelfatah
 * Joi validation schemas for workspace item (note) operations.
 */

const Joi = require('joi');

const composeItemSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Title must be a text value',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least {#limit} characters',
      'string.max': 'Title cannot exceed {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().min(1).required().messages({
      'string.base': 'Content must be a text value',
      'string.empty': 'Content cannot be empty',
      'any.required': 'Content is required',
    }),
    category: Joi.string().min(1).max(50).required().messages({
      'string.base': 'Category must be a text value',
      'string.empty': 'Category cannot be empty',
      'any.required': 'Category is required',
    }),
    tags: Joi.array().items(Joi.string().trim()).min(1).required().messages({
      'array.base': 'Tags must be an array of strings',
      'array.min': 'At least one tag is required',
      'any.required': 'Tags are required',
    }),
    status: Joi.string().valid('private', 'public').default('private').messages({
      'any.only': 'Status must be either private or public',
    }),
    is_pinned: Joi.boolean().default(false).messages({
      'boolean.base': 'is_pinned must be a boolean value',
    }),
  }),
};

const reviseItemSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).messages({
      'string.base': 'Title must be a text value',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least {#limit} characters',
      'string.max': 'Title cannot exceed {#limit} characters',
    }),
    content: Joi.string().min(1).messages({
      'string.base': 'Content must be a text value',
      'string.empty': 'Content cannot be empty',
    }),
    category: Joi.string().min(1).max(50).messages({
      'string.base': 'Category must be a text value',
      'string.empty': 'Category cannot be empty',
    }),
    tags: Joi.array().items(Joi.string().trim()).messages({
      'array.base': 'Tags must be an array of strings',
    }),
    status: Joi.string().valid('private', 'public').messages({
      'any.only': 'Status must be either private or public',
    }),
    is_pinned: Joi.boolean().messages({
      'boolean.base': 'is_pinned must be a boolean value',
    }),
  }).min(1),
};

module.exports = {
  composeItemSchema,
  reviseItemSchema,
};
