import { FaHandSparkles, FaHands } from 'react-icons/fa6'

import { NoteButton } from '@/components/features/Button/NoteButton'
import { Button } from '@/components/features/Button/DefaultButton'
import { ModalHeader, ModalFooter } from '@/components/features/Modal'

import { useCreateInvoiceContext } from '../context'

export const SelectType = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()

  const isDisabled = !formData.type

  return (
    <div className="flex flex-col h-full min-h-[29rem] justify-between">
      <div className="flex flex-col gap-6 justify-start items-center text-center pt-4">
        <ModalHeader title="Modo de preenchimento" />
        <div className="flex flex-row items-center gap-5 justify-center mt-10">
          <NoteButton
            text="MANUAL"
            value="WithoutIA"
            selectedType={formData.type}
            icon={<FaHands size={25} />}
            onClick={() => setFormData({ type: 'WithoutIA' })}
          />

          <NoteButton
            disabled
            value="WithIA"
            text="IA (EM BREVE)"
            selectedType={formData.type}
            icon={<FaHandSparkles size={25} />}
            onClick={() => setFormData({ type: 'WithIA' })}
          />
        </div>
      </div>

      <ModalFooter>
        <Button disabled={isDisabled} onClick={() => setStep(2)}>
          CONTINUAR
        </Button>
      </ModalFooter>
    </div>
  )
}
