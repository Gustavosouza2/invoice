import z from 'zod'

export const stepOneSchema = z.object({
  type: z.enum(['WithIA', 'WithoutIA']),
})

export const stepTwoSchema = z.object({
  invoiceNumber: z.number().min(1).max(9, 'O numero maximo de digítos é 9'),
  issueDate: z.date(),
})

export const createInvoiceSchema = stepOneSchema.merge(stepTwoSchema)
