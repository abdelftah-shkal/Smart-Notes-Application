/**
 * Workspace Flow — Workspace Schemas (Zod)
 * @author Abdelfatah
 */

import { z } from 'zod';

export const composeItemSchema = z.object({
  title:    z.string().min(3, 'Title must be at least 3 characters').max(100),
  content:  z.string().min(1, 'Content cannot be empty'),
  category: z.string().min(1, 'Category is required'),
  tagInput: z.string().min(1, 'At least one tag is required'),
  status:   z.enum(['private', 'public']).default('private'),
  is_pinned: z.boolean().default(false),
});

export const reviseItemSchema = composeItemSchema;
