import { FormProvider, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import axios from 'axios'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { removeEmptyValues } from '@/utils/removeEmptyValues'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'
import { Toast } from '@/components/features/Toast'

import { useInvoiceFormContext } from '../context'
import { serviceDetailsSchema } from '../schema'
import { useState } from 'react'

type ServiceDetailsFormData = {
  serviceDescription?: string
  serviceValue?: string
}

type ServiceDetailsProps = {
  onClose: () => void
}

export const ServiceDetails = ({ onClose }: ServiceDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { formData, setFormData, mode, invoiceId } = useInvoiceFormContext()

  const { mutate } = useSWRConfig()

  const schema = serviceDetailsSchema[mode]

  const form = useForm<ServiceDetailsFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      serviceDescription: formData.serviceDescription || '',
      serviceValue:
        formData.serviceValue !== undefined && formData.serviceValue !== null
          ? String(formData.serviceValue)
          : '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: ServiceDetailsFormData) => {
    setIsLoading(true)

    const serviceValueNumber =
      data.serviceValue !== undefined && data.serviceValue !== null

    const nextFormData = {
      serviceDescription: data.serviceDescription,
      serviceValue: parseFloat(data.serviceValue ?? '0'),
    }

    setFormData(nextFormData)

    if (mode === 'create') {
      const payload = {
        issueDate: formData.issueDate ?? '',
        providerName: formData.providerName ?? '',
        providerCnpj: formData.providerCnpj ?? '',
        customerName: formData.customerName ?? '',
        customerCnpjOrCpf: formData.customerCnpjOrCpf ?? '',
        serviceDescription: nextFormData.serviceDescription ?? '',
        serviceValue: serviceValueNumber ?? 0,
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
      issueDate: formData.issueDate,
      providerName: formData.providerName,
      providerCnpj: formData.providerCnpj,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      invoiceNumber: formData.invoiceNumber,
      serviceValue: parseFloat(data.serviceValue ?? '0'),
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
      <div className="flex flex-col h-full sm:min-h-[29rem] justify-between">
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
                    defaultValue={formData.serviceDescription}
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
                    value={field.value ?? ''}
                    onChangeCurrency={(value) => {
                      const stringValue =
                        value === undefined || value === null ? '' : value
                      form.setValue('serviceValue', stringValue, {
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
            <Button
              text="ENVIAR"
              type="default"
              htmlType="submit"
              isLoading={isLoading}
              disabled={isButtonDisabled}
            />
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
