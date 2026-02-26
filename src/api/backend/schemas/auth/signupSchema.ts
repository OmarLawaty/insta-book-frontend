import z from 'zod';
import { loginSchema } from './loginSchema';

export const passwordValidation = [
  //at least 6 chars
  { regex: /^.{6,}$/, message: 'Contain at least 6 characters long' },
  { regex: /[A-Z]/, message: 'Contain at least one uppercase letter' },
  { regex: /[a-z]/, message: 'Contain at least one lowercase letter' },
  { regex: /[0-9]/, message: 'Contain at least one number' },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'Contain at least one special character' },
];

export const signupSchema = z.object({
  ...loginSchema.shape,
  password: passwordValidation.reduce(
    (prev, { regex, message }) => prev.refine(val => regex.test(val), { message: `Password${message.toLowerCase()}` }),
    loginSchema.shape.password,
  ),
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
