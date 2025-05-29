import { z } from 'zod'

export interface UserEmailSchema {
  email: string
  username: string
}

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
    .refine((val: string) => !/\s/.test(val), { message: 'error.form.no_spaces_allowed' }),
}) as z.ZodType<UserEmailSchema>

export const user_password_schema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: 'profile.password.error.current_password_required' })
      .max(20, { message: 'profile.password.error.current_password_too_long' })
      .refine((val: string) => !/\s/.test(val), { message: 'error.form.no_spaces_allowed' }),

    new_password: z
      .string()
      .min(8, { message: 'profile.password.error.new_password_required' })
      .max(20, { message: 'profile.password.error.new_password_too_long' })
      .refine((val: string) => !/\s/.test(val), { message: 'error.form.no_spaces_allowed' }),
    confirm_new_password: z
      .string()
      .min(8, { message: 'profile.password.error.confirm_password_required' })
      .max(20, { message: 'profile.password.error.confirm_password_too_long' })
      .refine((val: string) => !/\s/.test(val), { message: 'error.form.no_spaces_allowed' }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_new_password) {
      ctx.addIssue({
        path: ['confirm_new_password'],
        code: z.ZodIssueCode.custom,
        message: 'profile.password.error.passwords_do_not_match',
      })
    }
  })
