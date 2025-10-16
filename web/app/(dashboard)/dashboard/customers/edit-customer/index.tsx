import { useEffect, useState } from 'react'

import { EditCustomerForm } from './steps/EditCustomerForm'
import { Modal } from '@/components/features/Modal'
import { EditMessage } from './steps/EditMessage'
import { Customer } from '@/types/customer'

type EditCustomerModalProps = {
  onClose: () => void
  customer: Customer
  isOpen: boolean
}

export type StepKey = 0 | 1

type Steps = {
  [K in StepKey]: JSX.Element
}

export const EditCustomerModal = ({
  customer,
  onClose,
  isOpen,
}: EditCustomerModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepKey>(0)

  useEffect(() => {
    if (!isOpen) setCurrentStep(0)
  }, [isOpen, setCurrentStep])

  const steps: Steps = {
    0: <EditCustomerForm setCurrentStep={setCurrentStep} customer={customer} />,
    1: <EditMessage onClose={onClose} />,
  }

  return (
    <Modal
      title={
        currentStep === 0
          ? 'Alterar valor total ou status'
          : 'Informações editadas'
      }
      description={
        currentStep === 0
          ? 'altere o status ou o valor total do pedido'
          : 'informações editadas, volte para a lista de clientes'
      }
      onClose={onClose}
      isOpen={isOpen}
    >
      {steps[currentStep]}
    </Modal>
  )
}
