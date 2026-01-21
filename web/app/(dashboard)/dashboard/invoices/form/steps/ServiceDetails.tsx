import { FormProvider, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import axios from 'axios'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { removeEmptyValues } from '@/utils/removeEmptyValues'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { useUserContext } from '@/context/userContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'
import { Toast } from '@/components/features/Toast'
import { decodeToken } from '@/services/token'

import { useInvoiceFormContext } from '../context'
import { serviceDetailsSchema } from '../schema'
import { useState } from 'react'

type ServiceDetailsFormData = {
  serviceDescription?: string
  serviceValue?: number
}

type ServiceDetailsProps = {
  onClose: () => void
}

export const ServiceDetails = ({ onClose }: ServiceDetailsProps) => {
  const { formData, setFormData, mode, invoiceId } = useInvoiceFormContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { userData } = useUserContext()
  const { mutate } = useSWRConfig()

  const schema = serviceDetailsSchema[mode]

  const form = useForm<ServiceDetailsFormData>({
    resolver: zodResolver(schema),
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
    setIsLoading(true)
    const nextFormData = {
      serviceDescription: data.serviceDescription,
      serviceValue: data.serviceValue,
    }

    setFormData(nextFormData)

    if (mode === 'create') {
      const tokenPayload = decodeToken()
      const userId = userData?.id ?? (tokenPayload?.sub as string) ?? ''

      const payload = {
        issueDate: formData.issueDate ?? '',
        providerName: formData.providerName ?? '',
        providerCnpj: formData.providerCnpj ?? '',
        customerName: formData.customerName ?? '',
        customerCnpjOrCpf: formData.customerCnpjOrCpf ?? '',
        serviceDescription: nextFormData.serviceDescription ?? '',
        serviceValue: nextFormData.serviceValue ?? 0,
        userId,
        ...(formData.type && { type: formData.type }),
        ...(formData.invoiceNumber && {
          invoiceNumber: Number(formData.invoiceNumber),
        }),
        ...(formData.customerEmail && {
          customerEmail: formData.customerEmail,
        }),
      }

      axios
        .post('/api/dashboard/invoices', payload, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
          mutate(
            (key) =>
              typeof key === 'string' &&
              key.startsWith('/api/dashboard/invoices'),
          )
          Toast({
            type: 'success',
            message: 'Nota fiscal criada com sucesso!',
          })
          onClose()
        })
        .catch(() => {
          Toast({
            type: 'error',
            message: 'Erro ao criar nota fiscal. Tente novamente.',
          })
        })
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    const payload = removeEmptyValues({
      id: invoiceId,
      taxRate: formData.taxRate,
      issValue: formData.issValue,
      netValue: formData.netValue,
      issueDate: formData.issueDate,
      providerName: formData.providerName,
      providerCnpj: formData.providerCnpj,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      invoiceNumber: formData.invoiceNumber,
      serviceValue: nextFormData.serviceValue,
      customerCnpjOrCpf: formData.customerCnpjOrCpf,
      serviceDescription: nextFormData.serviceDescription,
    })

    axios
      .patch('/api/dashboard/invoices', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        mutate(
          (key) =>
            typeof key === 'string' &&
            key.startsWith('/api/dashboard/invoices'),
        )
        Toast({
          type: 'success',
          message: 'Nota fiscal atualizada com sucesso!',
        })
        onClose()
      })
      .catch(() => {
        Toast({
          type: 'error',
          message: 'Erro ao atualizar nota fiscal. Tente novamente.',
        })
      })
    setIsLoading(false)
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
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={isButtonDisabled}
            >
              ENVIAR
            </Button>
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
