import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { useUserContext } from '@/context/userContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'
import { Toast } from '@/components/features/Toast'

import { useCreateInvoiceContext } from '../context'
import { stepFourSchema } from '../schema'

type ServiceDetailsFormData = {
  serviceDescription: string
  serviceValue?: number
}

export const ServiceDetails = ({ onClose }: { onClose: () => void }) => {
  const { formData, setFormData } = useCreateInvoiceContext()
  const { userData } = useUserContext()

  const form = useForm<ServiceDetailsFormData>({
    resolver: zodResolver(stepFourSchema),
    mode: 'onChange',
    defaultValues: {
      serviceDescription: formData.serviceDescription || '',
      serviceValue: formData.serviceValue ?? undefined,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: ServiceDetailsFormData) => {
    const nextFormData = {
      serviceDescription: data.serviceDescription,
      serviceValue: data.serviceValue,
    }

    setFormData(nextFormData)

    const payload = {
      issueDate: formData.issueDate ?? '',
      providerName: formData.providerName ?? '',
      providerCnpj: formData.providerCnpj ?? '',
      customerName: formData.customerName ?? '',
      customerCnpjOrCpf: formData.customerCnpjOrCpf ?? '',
      serviceDescription: nextFormData.serviceDescription,
      serviceValue: nextFormData.serviceValue ?? 0,
      userId: userData?.id ?? '',
      ...(formData.customerEmail
        ? { customerEmail: formData.customerEmail }
        : {}),
    }

    axios
      .post('/api/dashboard/invoices', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => onClose())
      .catch(() => {
        Toast({
          type: 'error',
          message: 'Erro ao criar nota fiscal. Tente novamente.',
        })
      })
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
              <ModalHeader title="Detalhes do Serviço" />
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
                      form.setValue(
                        'serviceValue',
                        values?.float ?? undefined,
                        {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        },
                      )
                    }}
                  />
                )}
              />
            </FieldGroup>
          </FieldSet>

          <ModalFooter>
            <Button type="submit" disabled={!isValid}>
              ENVIAR
            </Button>
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
