import { EMAIL_REGEX } from '@/utils/email-regex'
import z from 'zod'

function parseIssueDate(value: string): Date | null {
  const trimmedValue = value.trim()
  if (!trimmedValue) return null

  const brFormattedDate = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmedValue)
  const isoFormattedDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmedValue)

  const year = Number((isoFormattedDate?.[1] ?? brFormattedDate?.[3]) || NaN)
  const month = Number((isoFormattedDate?.[2] ?? brFormattedDate?.[2]) || NaN)
  const day = Number((isoFormattedDate?.[3] ?? brFormattedDate?.[1]) || NaN)

  return new Date(year, month - 1, day)
}

function formatIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

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
    .trim()
    .min(1, 'Data é obrigatória')
    .transform((val, ctx) => {
      const date = parseIssueDate(val)
      if (!date) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Data inválida' })
        return z.NEVER
      }

      const today = new Date()
      today.setHours(23, 59, 59, 999)
      if (date > today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A data não pode ser no futuro',
        })
        return z.NEVER
      }

      return formatIsoDate(date)
    }),
})

export const stepProviderSchema = z.object({
  providerName: z.string().min(1, 'Nome do prestador é obrigatório'),
  providerCnpj: z.string().min(1, 'CNPJ do prestador é obrigatório'),
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
    .trim()
    .email({ message: 'Por favor, insira um email válido' })
    .max(255, { message: 'Esse email é muito longo' })
    .regex(EMAIL_REGEX, { message: 'Insira um email válido' })
    .optional()
    .or(z.literal('')),
})

export const stepFourSchema = z.object({
  serviceDescription: z.string().min(1, 'A descrição do serviço é obrigatória'),
  serviceValue: z
    .number({ required_error: 'O valor do serviço é obrigatório' })
    .min(1, 'O valor do serviço é obrigatório'),
})

export const stepFiveSchema = z.object({
  taxRate: z.number().min(0, 'A taxa de imposto é obrigatória'),
  issValue: z.number().min(0, 'O valor do ISS é obrigatório'),
  netValue: z.number().min(0, 'O valor da nota é obrigatório'),
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
  .merge(stepFourSchema)
  .merge(stepFiveSchema)
  .merge(fileUploadSchema)
