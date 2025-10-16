import { type SetStateAction, type Dispatch, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

import { updateCustomerServer } from '@/server-actions/customers/update-customers'
import { Button } from '@/components/features/Button'
import { Input } from '@/components/features/Input'
import { type Customer } from '@/types/customer'

import { type StepKey } from '..'
import { EditCustomerSchema } from '../schema'

type EditCustomerFormProps = {
  setCurrentStep: Dispatch<SetStateAction<StepKey>>
  customer: Customer
}

export const EditCustomerForm = ({
  setCurrentStep,
  customer,
}: EditCustomerFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { refresh } = useRouter()

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(EditCustomerSchema),
    defaultValues: { amount: customer?.amount, status: customer?.status },
  })

  const { isValid } = form.formState

  const selectOptions = [
    { label: 'Pagar Depois', value: 'pending', id: 1 },
    { label: 'Pago', value: 'done', id: 2 },
  ]

  const onSubmit = async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('amount', form.getValues('amount').toString().slice(3))
    formData.append('status', form.getValues('status'))
    formData.append('id', customer?.id.toString() ?? '')

    try {
      await updateCustomerServer(formData)
      refresh()
      setCurrentStep(1)
    } catch (error) {
      toast({
        title: 'Algo deu errado!',
        description:
          'Erro ao editar os dados do cliente, por favor, tente novamente!',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form action={onSubmit}>
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full gap-1 mt-2">
              <FormLabel
                className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                htmlFor="status"
              >
                Status:
              </FormLabel>
              <FormControl>
                <Input
                  onChangeCurrency={field.onChange}
                  placeholder="Status da compra:"
                  onValueChange={field.onChange}
                  defaultValue={form.getValues('status')}
                  register={form.register}
                  options={selectOptions}
                  type="select"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full gap-1 mt-2">
              <FormLabel
                className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                htmlFor="amount"
              >
                Valor:
              </FormLabel>
              <FormControl>
                <Input
                  defaultValue={customer?.amount.toString()}
                  onChangeCurrency={field.onChange}
                  placeholder="Valor da compra"
                  register={form.register}
                  type="currency"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="mt-52 flex-wrap flex">
          <Button type="submit" isLoading={isLoading} disabled={!isValid}>
            {isLoading ? 'ENVIANDO...' : 'ENVIAR'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
