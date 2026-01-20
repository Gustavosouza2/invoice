'use client'

import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
} from 'react'

export type InvoiceFormMode = 'create' | 'edit'

export type InvoiceFormData = {
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
  id?: string
}

type InvoiceFormContextProps = {
  setFormData: (data: Partial<InvoiceFormData>) => void
  setStep: (step: number) => void
  clearFormData: () => void
  formData: InvoiceFormData
  mode: InvoiceFormMode
  invoiceId?: string
  step: number
}

const initialFormData: InvoiceFormData = {}

export const InvoiceFormContext = createContext<InvoiceFormContextProps>({
  formData: initialFormData,
  clearFormData: () => {},
  setFormData: () => {},
  setStep: () => {},
  mode: 'create',
  step: 1,
})

type InvoiceFormProviderProps = {
  children?: ReactNode
  initialData?: InvoiceFormData
  mode: InvoiceFormMode
  invoiceId?: string
}

export const InvoiceFormProvider: React.FC<InvoiceFormProviderProps> = ({
  children,
  initialData,
  mode,
  invoiceId,
}) => {
  const [step, setStep] = useState<number>(mode === 'create' ? 1 : 1)
  const [formData, setFormDataState] = useState<InvoiceFormData>(
    initialData ?? initialFormData,
  )

  const setFormData = useCallback(
    (data: Partial<InvoiceFormData>) => {
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
      mode,
      invoiceId,
    }),
    [step, setStep, formData, setFormData, clearFormData, mode, invoiceId],
  )

  return (
    <InvoiceFormContext.Provider value={valueContext}>
      {children}
    </InvoiceFormContext.Provider>
  )
}

export const useInvoiceFormContext = () => useContext(InvoiceFormContext)
