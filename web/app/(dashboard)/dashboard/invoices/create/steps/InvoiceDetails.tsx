import { FieldSet, FieldGroup, FieldLabel, Field } from '@/components/ui/field'
import { Button } from '@/components/features/Button/DefaultButton'
import { Input } from '@/components/features/Input'
import { ModalHeader, ModalFooter } from '@/components/features/Modal'

import { useCreateInvoiceContext } from '../context'

export const InvoiceDetails = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()
  const isDisabled =
    !formData.invoiceNumber || !formData.verificationCode || !formData.issueDate

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
              type="text"
              placeholder="Digite o número"
            />
          </Field>
          <Field>
            <FieldLabel className="-mb-1">Código de verificação:</FieldLabel>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ verificationCode: e.target.value })
              }
              type="text"
              placeholder="Digite o código"
            />
          </Field>
          <Field>
            <FieldLabel className="-mb-1">Data da Nota:</FieldLabel>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ issueDate: e.target.value })
              }
              type="text"
              placeholder="Data"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <ModalFooter>
        <Button disabled={isDisabled} onClick={() => setStep(3)}>
          CONTINUAR
        </Button>
      </ModalFooter>
    </div>
  )
}
