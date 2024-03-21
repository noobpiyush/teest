import * as z from 'zod';

export const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  language: z.enum(['cpp', 'java', 'javascript', 'python'], {
    required_error: 'Language is required',
    invalid_type_error: 'Invalid language',
  }),
  Stdinput: z.string().min(1, 'Standard input is required'),
  code: z.string().min(1, 'Code is required'),
});

export type UserData = z.infer<typeof userSchema>;