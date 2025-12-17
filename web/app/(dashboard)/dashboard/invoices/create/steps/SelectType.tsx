import { FaHandSparkles, FaHands } from 'react-icons/fa6'

import { NoteButton } from '@/components/features/NoteButton'
import { Button } from '@/components/features/Button'

import { useCreateInvoiceContext } from '../context'

export const SelectType = () => {
  const { formData, setFormData, setStep } = useCreateInvoiceContext()

  const isDisabled = !formData.type

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-poppins font-semibold text-text-primary">
        Selecione o tipo de nota
      </h2>
      <div className="flex flex-row items-center gap-5 justify-center mt-16">
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

      <div className="mt-44 w-full h-full">
        <Button disabled={isDisabled} onClick={() => setStep(2)}>
          CONTINUAR
        </Button>
      </div>
    </div>
  )
}
