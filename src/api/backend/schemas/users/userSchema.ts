import z from 'zod';
import { signupSchema } from '../auth';

export const userSchema = z.object({
  firstName: signupSchema.shape.firstName,
  lastName: signupSchema.shape.lastName,
  birthday: signupSchema.shape.birthday,
  file: z.custom<File>(value => value instanceof File, { message: 'Please upload a valid file' }).optional(),
  bio: z.string().max(160, { message: 'Bio must be at most 160 characters' }),
});

export type UserSchema = z.infer<typeof userSchema>;
