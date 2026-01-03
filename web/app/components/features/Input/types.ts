import { CurrencyInputOnChangeValues } from 'react-currency-input-field'
import { type UseFormRegister } from 'react-hook-form'

import { type InputProps } from '@/components/ui/input'

type InputProperty = InputProps & {
  type: 'password' | 'select' | 'currency' | 'text' | 'number' | 'date'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  iconType?: 'email' | 'password' | 'phone' | 'name'
  register?: UseFormRegister<any> //eslint-disable-line
  showPasswordTips?: boolean
  value?: string | number
  placeholder: string
  maxLength?: number
  mask?: string
}

type SelectInputProps = {
  onValueChange?: (value: string) => void
  options?: Array<{
    label: string
    value: string
    id: number
  }>
}

type CurrencyInputProps = {
  onChangeCurrency?: (
    value: string,
    name?: string,
    values?: CurrencyInputOnChangeValues,
  ) => void
  prefix?: string
  intlConfig?: {
    locale: string
    currency: string
  }
  decimalSeparator?: string
  groupSeparator?: string
}
export type AbstractInputsProps = SelectInputProps &
  CurrencyInputProps &
  InputProperty
