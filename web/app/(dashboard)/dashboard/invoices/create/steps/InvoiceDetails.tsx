import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { ModalHeader, ModalFooter } from '@/components/features/Modal'
import { Button } from '@/components/features/Button/DefaultButton'
import { Input } from '@/components/features/Input'

import { useCreateInvoiceContext } from '../context'
import { stepTwoSchema } from '../schema'

export const InvoiceDetails = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()
  const isDisabled = !formData.invoiceNumber || !formData.issueDate

  const handleNextStep = () => {
    const stepTwoValidated = stepTwoSchema.safeParse(formData)
    if (stepTwoValidated.success) setStep(3)
  }

  return (
    <div className="flex flex-col h-full min-h-[29rem] justify-between">
      <FieldSet className="w-full">
        <div className="flex justify-center mt-2 mb-4">
          <ModalHeader title="Detalhes da Nota" />
        </div>
        <FieldGroup className="gap-3">
          <Field>
            <FieldLabel className="-mb-1">Numero da Nota:</FieldLabel>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ invoiceNumber: Number(e.target.value) })
              }
              type="number"
              maxLength={9}
              placeholder="Digite o número da nota"
            />
            <FieldError>{}</FieldError>
          </Field>
          <Field>
            <FieldLabel className="-mb-1">Data da Nota:</FieldLabel>
            <Input
              value={formData.issueDate || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ issueDate: e.target.value })
              }
              type="date"
              placeholder="Digite a Data da nota"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <ModalFooter>
        <Button disabled={isDisabled} onClick={handleNextStep}>
          CONTINUAR
        </Button>
      </ModalFooter>
    </div>
  )
}
