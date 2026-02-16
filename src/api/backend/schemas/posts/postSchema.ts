import z from 'zod';

export const postSchema = z.object({
  caption: z
    .string()
    .min(1, { message: 'Caption must be at least 1 character' })
    .max(2200, { message: 'Caption must be at most 2200 characters' }),
  tags: z
    .string()
    .min(1, { message: 'Tag must be at least 1 character' })
    .max(100, { message: 'Tag must be at most 100 characters' })
    .refine(
      val => {
        const tags = val.split(',').map(tag => tag.trim());
        return tags.every(tag => tag.length >= 1 && tag.length <= 100);
      },
      {
        error: 'Each tag must be between 1 and 100 characters, separated by commas',
      },
    ),
  imageId: z.string().min(1, { message: 'Please upload an image' }),
  location: z
    .string()
    .min(1, { message: 'Location must be at least 1 character' })
    .max(100, { message: 'Location must be at most 100 characters' }),
});

export type PostSchema = z.infer<typeof postSchema>;
