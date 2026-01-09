import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import axios from 'axios'

import { CreateFormData, useCreateInvoiceContext } from '../context'
import { stepFiveSchema } from '../schema'

import { ModalFooter, ModalHeader } from '@/components/features/Modal'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import { FormField } from '@/components/ui/form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/components/features/Toast'
import { Input } from '@/components/features/Input'
import { Button } from '@/components/ui/button'

type TaxValuesFormData = {
  taxRate: number
  issValue: number
  netValue: number
}

export const TaxValues = ({ onClose }: { onClose: () => void }) => {
  const { formData: formDataValues, setFormData } = useCreateInvoiceContext()

  const form = useForm<TaxValuesFormData>({
    resolver: zodResolver(stepFiveSchema),
    mode: 'onChange',
    defaultValues: {
      taxRate: formDataValues.taxRate || 0,
      issValue: formDataValues.issValue || 0,
      netValue: formDataValues.netValue || 0,
    },
  })

  const {
    watch,
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  useEffect(() => {
    const subscription = watch((values) =>
      setFormData({
        taxRate: values.taxRate,
        issValue: values.issValue,
        netValue: values.netValue,
      }),
    )
    return () => subscription.unsubscribe()
  }, [watch, setFormData])

  const onSubmit = async (data: CreateFormData) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value.toString())
      }
    })

    await axios
      .post('/api/dashboard/invoices', formData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // TODO: Verify if status is 200 or 201
          Toast({
            type: 'error',
            message: 'Erro ao criar nota fiscal. Tente novamente.',
          })
        }
        onClose()
      })
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
              <ModalHeader title="Impostos e Valores" />
            </div>
            <FieldGroup className="gap-6">
              <FormField
                name="taxRate"
                control={control}
                labelClassName="-mb-1"
                label="Taxa de Imposto (%):"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Digite a taxa de imposto"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />

              <FormField
                name="issValue"
                control={control}
                labelClassName="-mb-1"
                label="Valor do ISS (R$):"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="currency"
                    placeholder="Digite o valor do ISS"
                    onChangeCurrency={(_, __, values) => {
                      form.setValue('issValue', values?.float ?? 0, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                )}
              />

              <FormField
                name="issValue"
                control={control}
                labelClassName="-mb-1"
                label="Valor do ISS (R$):"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="currency"
                    placeholder="Digite o valor do ISS"
                    onChangeCurrency={(_, __, values) => {
                      form.setValue('issValue', values?.float ?? 0, {
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
