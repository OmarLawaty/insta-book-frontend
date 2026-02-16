import z from 'zod';
import { loginSchema } from './loginSchema';
import { signupSchema } from './signupSchema';

export const forgotPasswordSchema = z.object({
  ...loginSchema.shape,
  password: signupSchema.shape.password,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
