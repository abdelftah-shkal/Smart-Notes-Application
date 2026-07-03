/**
 * Workspace Flow — Identity Schemas (Zod)
 * @author Abdelfatah
 */

import { z } from 'zod';

export const signInSchema = z.object({
  email:    z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const enrollmentSchema = z.object({
  name:     z.string().min(3, 'Name must be at least 3 characters').max(50),
  email:    z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});
