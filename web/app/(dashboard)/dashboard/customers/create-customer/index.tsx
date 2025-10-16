import { useEffect, useState } from 'react'

import { CreateCustomerForm } from './steps/CreateCustomerForm'
import { CreateMessage } from './steps/CreateMessage'
import { Modal } from '@/components/features/Modal'

type CreateCustomerModalProps = {
  onClose: () => void
  isOpen: boolean
}

export type StepKey = 0 | 1

type Steps = {
  [K in StepKey]: JSX.Element
}

export const CreateCustomerModal = ({
  onClose,
  isOpen,
}: CreateCustomerModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepKey>(0)

  useEffect(() => {
    if (!isOpen) setCurrentStep(0)
  }, [isOpen, setCurrentStep])

  const steps: Steps = {
    0: <CreateCustomerForm setCurrentStep={setCurrentStep} />,
    1: <CreateMessage onClose={onClose} />,
  }

  return (
    <Modal
      title={
        currentStep === 0
          ? 'Registre um novo cliente'
          : 'Cliente registrado com sucesso'
      }
      description={
        currentStep === 0
          ? 'adicione um cliente para ser possível realizar a cobrança'
          : 'volte para a lista de clientes'
      }
      onClose={onClose}
      isOpen={isOpen}
    >
      {steps[currentStep]}
    </Modal>
  )
}
