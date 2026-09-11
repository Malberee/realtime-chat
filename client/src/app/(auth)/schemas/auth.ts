import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(16, 'Username must be less than 16 characters long'),

  email: z.string().email('Enter a valid email'),

  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

export type AuthSchema = z.infer<typeof authSchema>
