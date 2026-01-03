import { EMAIL_REGEX } from '@/utils/email-regex'
import z from 'zod'

export const stepOneSchema = z.object({
  type: z.enum(['WithIA', 'WithoutIA']),
})

export const stepTwoSchema = z.object({
  invoiceNumber: z.coerce
    .number({
      required_error: 'Número da nota é obrigatório',
      invalid_type_error: 'Deve ser um número válido',
    })
    .int('Deve ser um número inteiro')
    .positive('Deve ser um número positivo')
    .refine((value) => value.toString().length <= 9, {
      message: 'O número deve ter no máximo 9 dígitos',
    }),
  issueDate: z
    .string({ required_error: 'Data é obrigatória' })
    .min(1, 'Data é obrigatória')
    .refine(
      (val) => {
        const date = new Date(val)
        return !isNaN(date.getTime())
      },
      { message: 'Data inválida' },
    )
    .refine(
      (val) => {
        const date = new Date(val)
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        return date <= today
      },
      { message: 'A data não pode ser no futuro' },
    )
    .transform((val) => new Date(val)),
})

export const stepThreeSchema = z.object({
  customerName: z
    .string()
    .min(2, 'O Nome do cliente deve ter pelo menos 2 caracteres')
    .max(50, 'O Nome do cliente não pode exceder 50 caracteres')
    .trim()
    .nonempty('Nome do cliente é obrigatório'),
  customerCnpjOrCpf: z.string().min(1).max(14),
  customerEmail: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Por favor, insira um email válido' })
    .max(255, { message: 'Esse email é muito longo' })
    .regex(EMAIL_REGEX, { message: 'Insira um email válido' }),
})

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: 'Por favor, selecione um arquivo' })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'O arquivo deve ter no máximo 5MB',
    })
    .refine(
      (file) =>
        ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(
          file.type,
        ),
      {
        message: 'Apenas arquivos PDF, JPEG ou PNG são permitidos',
      },
    )
    .optional()
    .nullable(),
})

export const createInvoiceSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(fileUploadSchema)
