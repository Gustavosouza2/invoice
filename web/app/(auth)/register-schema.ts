import { z } from 'zod'

import { EMAIL_REGEX } from '@/utils/email-regex'

export const RegisterSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, { message: 'Insira um email válido' }),
  phone: z
    .string()
    .min(9, { message: 'Telefone deve ter pelo menos 9 caracteres' }),
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})
