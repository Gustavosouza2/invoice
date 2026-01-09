import { FormProvider, useForm } from 'react-hook-form'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'

import { useCreateInvoiceContext } from '../context'
import { stepFourSchema } from '../schema'

type ServiceDetailsFormData = {
  serviceDescription: string
  serviceValue: number
}

export const ServiceDetails = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()

  const form = useForm<ServiceDetailsFormData>({
    resolver: zodResolver(stepFourSchema),
    mode: 'onChange',
    defaultValues: {
      serviceDescription: formData.serviceDescription || '',
      serviceValue: formData.serviceValue || 0,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: ServiceDetailsFormData) => {
    setFormData({
      serviceDescription: data.serviceDescription,
      serviceValue: data.serviceValue,
    })
    setStep(5)
  }

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
                name="serviceDescription"
                label="Descrição do Serviço:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="textArea"
                    placeholder="Digite a descrição do serviço"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />

              <FormField
                control={control}
                name="serviceValue"
                labelClassName="-mb-1"
                label="Valor do Serviço (R$):"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="currency"
                    placeholder="Digite o valor do serviço"
                    onChangeCurrency={(_, __, values) => {
                      form.setValue('serviceValue', values?.float ?? 0, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                )}
              />
            </FieldGroup>
          </FieldSet>

          <ModalFooter>
            <Button type="submit" disabled={!isValid}>
              CONTINUAR
            </Button>
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
