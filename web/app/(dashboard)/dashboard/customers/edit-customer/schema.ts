import { z } from 'zod'

export const EditCustomerSchema = z.object({
  amount: z.string(),
  status: z.string(),
})
