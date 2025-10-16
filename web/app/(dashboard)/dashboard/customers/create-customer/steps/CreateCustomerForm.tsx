import { SetStateAction, Dispatch } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

import { createCustomerServer } from '@/server-actions/customers/create-customers'
import { Button } from '@/components/features/Button'
import { Input } from '@/components/features/Input'
import { CreateCustomerSchema } from '../schema'
import { StepKey } from '..'

type CreateCustomerFormProps = {
  setCurrentStep: Dispatch<SetStateAction<StepKey>>
}

type InputsProps = Array<{
  type: 'text' | 'password' | 'select' | 'currency'
  name: 'email' | 'name' | 'amount' | 'status'
  register: UseFormRegister<any>
  placeholder: string
  options?: Array<{
    label: string
    value: string
    id: number
  }>
  label: string
  id: number
}>

export const CreateCustomerForm = ({
  setCurrentStep,
}: CreateCustomerFormProps) => {
  const form = useForm({
    defaultValues: { email: '', name: '', amount: '', status: '' },
    resolver: zodResolver(CreateCustomerSchema),
    shouldUnregister: true,
  })

  const selectOptions = [
    { label: 'Pagar Depois', value: 'pending', id: 1 },
    { label: 'Pago', value: 'done', id: 2 },
  ]

  const {
    watch,
    formState: { isValid },
  } = form

  const onSubmit = async () => {
    try {
      const formValues = form.getValues()

      const date = new Date()
      const year = date.getFullYear()
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')

      const formattedDate = `${year}-${month}-${day}`

      const formData = new FormData()
      formData.append('amount', formValues.amount.toString().slice(3))
      formData.append('status', formValues.status)
      formData.append('createdAt', formattedDate)
      formData.append('email', formValues.email)
      formData.append('name', formValues.name)

      const response = await createCustomerServer(formData)

      if (response.status === 200) {
        setCurrentStep(1)
      }
    } catch (error) {
      console.error('Error creating customer:', error)
    }
  }

  const inputs: InputsProps = [
    {
      placeholder: 'Nome do cliente',
      register: form.register,
      label: 'Nome:',
      type: 'text',
      name: 'name',
      id: 2,
    },
    {
      placeholder: 'example@gmail.com',
      register: form.register,
      label: 'Email:',
      name: 'email',
      type: 'text',
      id: 1,
    },
    {
      placeholder: 'Status da compra:',
      options: selectOptions,
      register: form.register,
      label: 'Status:',
      name: 'status',
      type: 'select',
      id: 3,
    },
    {
      placeholder: 'Valor da compra',
      register: form.register,
      type: 'currency',
      label: 'Valor:',
      name: 'amount',
      id: 4,
    },
  ]

  return (
    <Form {...form}>
      <form action={onSubmit}>
        {inputs.map((input) => (
          <FormField
            key={input.id}
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full gap-1 mt-2">
                <FormLabel
                  className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                  htmlFor={input.name}
                >
                  {input.label}
                </FormLabel>
                <FormControl>
                  <Input
                    onChangeCurrency={field.onChange}
                    placeholder={input.placeholder}
                    onValueChange={field.onChange}
                    register={input.register}
                    options={input.options}
                    type={input.type}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <div className="mt-10 flex-wrap flex">
          <Button
            type="submit"
            disabled={!isValid || !watch('status') || !watch('amount')}
          >
            ENVIAR
          </Button>
        </div>
      </form>
    </Form>
  )
}
