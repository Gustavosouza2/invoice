import { useEffect } from 'react'

import { Modal } from '@/components/features/Modal'

import { useCreateInvoiceContext } from './context'
import { SelectType } from './steps/SelectType'

type CreateInvoiceProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreateInvoiceModal = ({ isOpen, onClose }: CreateInvoiceProps) => {
  const { step, setStep, clearFormData } = useCreateInvoiceContext()

  const currentStep: Record<number, JSX.Element> = {
    1: <SelectType />,
  }

  useEffect(() => {
    if (!isOpen) {
      clearFormData()
      setStep(1)
    }
  }, [isOpen, setStep, clearFormData])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {currentStep[step]}
    </Modal>
  )
}
