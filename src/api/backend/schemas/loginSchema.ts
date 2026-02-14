import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z
    .string({ error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
