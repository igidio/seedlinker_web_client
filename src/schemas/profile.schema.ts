import { z } from "zod";

export const user_email_schema = z.object({
  email: z
    .string()
    .email({ message: 'profile.error.email_invalid' })
    .min(1, { message: 'profile.error.email_required' })
    .max(255, { message: 'profile.error.email_too_long' }),
  username: z
    .string()
    .min(1, { message: 'profile.error.username_required' })
    .max(50, { message: 'profile.error.username_too_long' })
})
