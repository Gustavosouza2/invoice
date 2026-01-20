import { FormProvider, useForm } from 'react-hook-form'

import { ModalHeader, ModalFooter } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { FieldSet, FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'

import { useCreateInvoiceContext } from '../context'
import { stepTwoSchema } from '../schema'

type InvoiceDetailsFormData = {
  invoiceNumber: number
  issueDate: string
}

export const InvoiceDetails = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()

  const form = useForm<InvoiceDetailsFormData>({
    resolver: zodResolver(stepTwoSchema),
    mode: 'onChange',
    defaultValues: {
      issueDate: formData.issueDate || '',
      invoiceNumber: formData?.invoiceNumber,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: InvoiceDetailsFormData) => {
    setFormData({
      invoiceNumber: data.invoiceNumber,
      issueDate: data.issueDate,
    })
    setStep(3)
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
              <ModalHeader title="Detalhes da Nota" />
            </div>
            <FieldGroup className="gap-6">
              <FormField
                control={control}
                name="invoiceNumber"
                label="Numero da Nota:"
                labelClassName="-mb-1"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="number"
                      maxLength={9}
                      value={field.value ?? ''}
                      placeholder="Digite o número da nota"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </>
                )}
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
            <Button disabled={!isValid} type="submit">
              CONTINUAR
            </Button>
          </ModalFooter>
        </form>
      </div>
    </FormProvider>
  )
}
