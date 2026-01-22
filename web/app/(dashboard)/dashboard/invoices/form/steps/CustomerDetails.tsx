import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/features/Input'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { useInvoiceFormContext } from '../context'
import { customerDetailsSchema } from '../schema'

type CustomerDetailsFormData = {
  customerCnpjOrCpf?: string
  customerEmail?: string
  customerName?: string
}

export const CustomerDetails = () => {
  const { setStep, formData, setFormData, mode } = useInvoiceFormContext()

  const schema = customerDetailsSchema[mode]

  const form = useForm<CustomerDetailsFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      customerName: formData.customerName || '',
      customerEmail: formData.customerEmail || '',
      customerCnpjOrCpf: formData.customerCnpjOrCpf || '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: CustomerDetailsFormData) => {
    setFormData({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerCnpjOrCpf: data.customerCnpjOrCpf,
    })
    setStep(4)
  }

  const isButtonDisabled = mode === 'create' ? !isValid : false

  return (
    <FormProvider {...form}>
      <div className="flex flex-col h-full min-h-[29rem] justify-between">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <FieldSet className="w-full">
            <div className="flex justify-center mt-2 mb-4">
              <ModalHeader title="Detalhes do Cliente" />
            </div>
            <FieldGroup className="gap-6">
              <FormField
                control={control}
                name="customerName"
                label="Nome do Cliente:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Digite o nome do cliente"
                  />
                )}
              />

              <FormField
                control={control}
                labelClassName="-mb-1"
                label="CPF Do Cliente:"
                name="customerCnpjOrCpf"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    mask="999.999.999-99"
                    placeholder="Digite o CPF ou CNPJ do cliente"
                  />
                )}
              />

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-medium text-text-primary">
                    Email do Cliente:
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-text-tertiary cursor-help hover:text-text-secondary transition-colors" />
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormField
                  control={control}
                  name="customerEmail"
                  labelClassName="hidden"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o email do cliente (opcional)"
                    />
                  )}
                />
              </div>
            </FieldGroup>
          </FieldSet>

          <ModalFooter>
            <Button
              type="default"
              text="CONTINUAR"
              htmlType="submit"
              disabled={isButtonDisabled}
            />
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
