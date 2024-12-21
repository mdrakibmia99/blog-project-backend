import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email must be provided and must be a string' })
      .email(),
    password: z
      .string({
        required_error: 'Password must be provided and must be a string',
      })
      .max(20, { message: 'Password must be less than 20 characters' }),
  }),
});

export const userValidation = {
  userValidationSchema,
};
