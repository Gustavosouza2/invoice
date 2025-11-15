import { z } from 'zod'

import { EMAIL_REGEX } from '@/utils/email-regex'

export const LoginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, { message: 'Insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})
