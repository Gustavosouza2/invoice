'use client'

import { useEffect } from 'react'

import { Modal } from '@/components/features/Modal'

import { CustomerDetails } from './steps/CustomerDetails'
import { ProviderDetails } from './steps/ProviderDetails'
import { InvoiceDetails } from './steps/InvoiceDetails'
import { ServiceDetails } from './steps/ServiceDetails'
import { useInvoiceFormContext } from './context'
import { SelectType } from './steps/SelectType'

type InvoiceFormModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const InvoiceFormModal = ({
  isOpen,
  onClose,
}: InvoiceFormModalProps) => {
  const { setStep, clearFormData, step: currentStep } = useInvoiceFormContext()

  const steps: Record<number, JSX.Element> = {
    1: <SelectType />,
    2: <InvoiceDetails />,
    3: <CustomerDetails />,
    4: <ProviderDetails />,
    5: <ServiceDetails onClose={onClose} />,
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
