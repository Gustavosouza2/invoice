'use client'

import {
  useState,
  useContext,
  createContext,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react'

export type CreateFormData = {
  providerMunicipalReg?: string
  type?: 'WithIA' | 'WithoutIA'
  serviceDescription?: string
  customerCnpjOrCpf?: string
  verificationCode?: string
  invoiceNumber?: number
  customerEmail?: string
  providerName?: string
  providerCnpj?: string
  customerName?: string
  serviceValue?: number
  file?: File | null
  issueDate?: string
  issValue?: number
  netValue?: number
  taxRate?: number
  userId?: string
  status?: string
}

type CreateInvoiceContextProps = {
  setFormData: (data: Partial<CreateFormData>) => void
  setStep: (step: number) => void
  clearFormData: () => void
  formData: CreateFormData
  step: number
}

const initialFormData: CreateFormData = {}

export const CreateInvoiceContext = createContext<CreateInvoiceContextProps>({
  formData: initialFormData,
  clearFormData: () => {},
  setFormData: () => {},
  setStep: () => {},
  step: 1,
})

export const CreateInvoiceContextProvider: React.FC<{
  children?: ReactNode
  initialData?: CreateFormData
}> = ({ children, initialData }) => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormDataState] = useState<CreateFormData>(
    initialData ?? initialFormData,
  )

  const setFormData = useCallback(
    (data: Partial<CreateFormData>) => {
      setFormDataState((prev) => ({ ...prev, ...data }))
    },
    [setFormDataState],
  )

  const clearFormData = useCallback(() => {
    setFormDataState(initialFormData)
  }, [setFormDataState])

  const valueContext = useMemo(
    () => ({
      step,
      setStep,
      formData,
      setFormData,
      clearFormData,
    }),
    [formData, setFormData, setStep, step, clearFormData],
  )

  return (
    <CreateInvoiceContext.Provider value={valueContext}>
      {children}
    </CreateInvoiceContext.Provider>
  )
}

export const useCreateInvoiceContext = () => useContext(CreateInvoiceContext)
