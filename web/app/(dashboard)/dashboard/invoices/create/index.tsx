import { useEffect } from 'react'

import { Modal } from '@/components/features/Modal'

import { CustomerDetails } from './steps/CustomerDetails'
import { InvoiceDetails } from './steps/InvoiceDetails'
import { useCreateInvoiceContext } from './context'
import { SelectType } from './steps/SelectType'

type CreateInvoiceProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreateInvoiceModal = ({ isOpen, onClose }: CreateInvoiceProps) => {
  const {
    setStep,
    clearFormData,
    step: currentStep,
  } = useCreateInvoiceContext()

  const steps: Record<number, JSX.Element> = {
    1: <SelectType />,
    2: <InvoiceDetails />,
    3: <CustomerDetails />,
  }

  useEffect(() => {
    if (!isOpen) {
      clearFormData()
      setStep(1)
    }
  }, [isOpen, setStep, clearFormData])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {steps[currentStep]}
    </Modal>
  )
}
