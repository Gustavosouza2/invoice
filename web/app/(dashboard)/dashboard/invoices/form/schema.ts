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

export const selectTypeSchema = z.object({
  type: z.enum(['WithIA', 'WithoutIA']),
})

export const invoiceDetailsSchema = {
  create: z.object({
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
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Data inválida',
          })
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
  }),
  edit: z.object({
    invoiceNumber: z.coerce
      .number({
        invalid_type_error: 'Deve ser um número válido',
      })
      .int('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
      .refine((value) => value.toString().length <= 9, {
        message: 'O número deve ter no máximo 9 dígitos',
      })
      .optional(),
    issueDate: z
      .string()
      .trim()
      .transform((val, ctx) => {
        if (!val) return undefined
        const date = parseIssueDate(val)
        if (!date) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Data inválida',
          })
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
      })
      .optional(),
  }),
}

export const customerDetailsSchema = {
  create: z.object({
    customerName: z
      .string()
      .min(2, 'O Nome do cliente deve ter pelo menos 2 caracteres')
      .max(50, 'O Nome do cliente não pode exceder 50 caracteres')
      .trim()
      .nonempty('Nome do cliente é obrigatório'),
    customerCnpjOrCpf: z
      .string()
      .min(1, 'CPF ou CNPJ do cliente é obrigatório')
      .max(14, 'CPF ou CNPJ deve ter no máximo 14 caracteres'),
    customerEmail: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          if (!val || val === '') return true
          return EMAIL_REGEX.test(val)
        },
        { message: 'Por favor, insira um email válido' },
      )
      .refine(
        (val) => {
          if (!val || val === '') return true
          return val.length <= 255
        },
        { message: 'Esse email é muito longo' },
      )
      .or(z.literal('')),
  }),
  edit: z.object({
    customerName: z
      .string()
      .min(2, 'O Nome do cliente deve ter pelo menos 2 caracteres')
      .max(50, 'O Nome do cliente não pode exceder 50 caracteres')
      .trim()
      .optional()
      .or(z.literal('')),
    customerCnpjOrCpf: z.string().max(14).optional().or(z.literal('')),
    customerEmail: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          if (!val || val === '') return true
          return EMAIL_REGEX.test(val)
        },
        { message: 'Por favor, insira um email válido' },
      )
      .refine(
        (val) => {
          if (!val || val === '') return true
          return val.length <= 255
        },
        { message: 'Esse email é muito longo' },
      )
      .or(z.literal('')),
  }),
}

export const providerDetailsSchema = {
  create: z.object({
    providerName: z.string().min(1, 'Nome do prestador é obrigatório'),
    providerCnpj: z.string().min(1, 'CNPJ do prestador é obrigatório'),
  }),
  edit: z.object({
    providerName: z.string().optional(),
    providerCnpj: z.string().optional(),
  }),
}

export const serviceDetailsSchema = {
  create: z.object({
    serviceDescription: z
      .string()
      .min(1, 'A descrição do serviço é obrigatória'),
    serviceValue: z
      .string()
      .refine(
        (val) => {
          if (val === '' || val === undefined || val === null) return false
          const numValue = parseFloat(val.replace(/\./g, '').replace(',', '.'))
          return !isNaN(numValue) && numValue > 0
        },
        {
          message: 'O valor do serviço é obrigatório e deve ser maior que zero',
        },
      )
      .transform((val) => {
        if (val === '' || val === undefined || val === null) return 0
        return parseFloat(val.replace(/\./g, '').replace(',', '.')) || 0
      }),
  }),
  edit: z.object({
    serviceDescription: z.string().optional(),
    serviceValue: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val === undefined || val === null || val === '') return true
          const numValue = parseFloat(val.replace(/\./g, '').replace(',', '.'))
          return !isNaN(numValue) && numValue >= 0
        },
        { message: 'O valor do serviço deve ser um número válido' },
      )
      .transform((val) => {
        if (val === undefined || val === null || val === '') return undefined
        return parseFloat(val.replace(/\./g, '').replace(',', '.')) || undefined
      }),
  }),
}
