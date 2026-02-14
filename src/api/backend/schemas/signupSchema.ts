import z from 'zod';
import { loginSchema } from './loginSchema';

export const signupSchema = z.object({
  ...loginSchema.shape,
  password: loginSchema.shape.password
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(value => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(value => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
  firstName: z
    .string({ error: 'First name is required' })
    .min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z
    .string({ error: 'Last name is required' })
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  birthday: z.string({ error: 'Birthday is required' }).refine(
    value => {
      const date = new Date(value);
      const now = new Date();
      return !isNaN(date.getTime()) && date < now;
    },
    { message: 'Invalid birthday' },
  ),
});

export type SignupSchema = z.infer<typeof signupSchema>;
