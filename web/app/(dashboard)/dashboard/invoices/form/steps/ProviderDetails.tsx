'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { useUserContext } from '@/context/userContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'

import { useInvoiceFormContext } from '../context'
import { providerDetailsSchema } from '../schema'

type ProviderDetailsFormData = {
  providerName?: string
  providerCnpj?: string
}

export const ProviderDetails = () => {
  const { userData } = useUserContext()
  const { formData, setFormData, setStep, mode } = useInvoiceFormContext()

  const schema = providerDetailsSchema[mode]

  const form = useForm<ProviderDetailsFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      providerName: formData.providerName || userData?.name || '',
      providerCnpj: formData.providerCnpj || '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: ProviderDetailsFormData) => {
    setFormData({
      providerName: data.providerName,
      providerCnpj: data.providerCnpj,
    })
    setStep(5)
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
              <ModalHeader title="Dados do Prestador" />
            </div>
            <FieldGroup className="gap-6">
              <FormField
                control={control}
                name="providerName"
                label="Nome do Prestador:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Digite o nome do prestador"
                  />
                )}
              />

              <FormField
                control={control}
                name="providerCnpj"
                label="CNPJ do Prestador:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    mask="99.999.999/9999-99"
                    placeholder="Digite o CNPJ do prestador"
                  />
                )}
              />
            </FieldGroup>
          </FieldSet>

          <ModalFooter>
            <Button type="submit" disabled={isButtonDisabled}>
              CONTINUAR
            </Button>
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
