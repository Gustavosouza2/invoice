export interface Customer {
  createdAt: string
  status: string
  amount: number
  email: string
  name: string
  id: number
}

export type CustomersResponse = {
  data: Customer[]
  count: number
}

export type CreateCustomerResponse = {
  customer: Customer
  status: number
}

export type UpdateCustomerRequest = Pick<Customer, 'id' | 'amount' | 'status'>

export type UpdateCustomerResponse = Pick<
  CreateCustomerResponse,
  'status' | 'customer'
>
