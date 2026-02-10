import { FormProvider, useForm } from 'react-hook-form'
import { useMemo } from 'react'

import { ModalHeader, ModalFooter } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldSet, FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'

import { useInvoiceFormContext } from '../context'
import { invoiceDetailsSchema } from '../schema'

type InvoiceDetailsFormData = {
  invoiceNumber?: number | string
  issueDate?: string
}

export const InvoiceDetails = () => {
  const { formData, setFormData, setStep, mode } = useInvoiceFormContext()

  const schema = invoiceDetailsSchema[mode]

  const defaultValues = useMemo(
    () => ({
      issueDate: formData.issueDate || '',
      invoiceNumber:
        formData?.invoiceNumber !== undefined &&
        formData?.invoiceNumber !== null
          ? String(formData.invoiceNumber)
          : '',
    }),
    [formData.invoiceNumber, formData.issueDate],
  )

  const form = useForm<InvoiceDetailsFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
    shouldUnregister: false,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: InvoiceDetailsFormData) => {
    const invoiceNumberValue =
      data.invoiceNumber && String(data.invoiceNumber).trim() !== ''
        ? Number(data.invoiceNumber)
        : undefined

    setFormData({
      invoiceNumber: invoiceNumberValue,
      issueDate: data.issueDate,
    })
    setStep(3)
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
              <ModalHeader title="Detalhes da Nota" />
            </div>
            <FieldGroup className="gap-6">
              <FormField
                control={control}
                name="invoiceNumber"
                label="Numero da Nota:"
                labelClassName="-mb-1"
                render={({ field }) => {
                  return (
                    <Input
                      name={field.name}
                      onBlur={field.onBlur}
                      type="number"
                      maxLength={9}
                      value={field.value ?? ''}
                      placeholder="Digite o número da nota"
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value === '' ? '' : value)
                      }}
                    />
                  )
                }}
              />
              <FormField
                control={control}
                name="issueDate"
                label="Data da Nota:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    mask="99/99/9999"
                    placeholder="Digite a Data da nota (DD/MM/YYYY)"
                  />
                )}
              />
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
