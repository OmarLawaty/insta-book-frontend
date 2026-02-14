import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z
    .string({
      error: 'Password is required',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
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
});

export type LoginSchema = z.infer<typeof loginSchema>;
