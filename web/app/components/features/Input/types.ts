import { type InputProps } from '@/components/ui/input'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field'
import { type UseFormRegister } from 'react-hook-form'

type InputProperty = InputProps & {
  type:
    | 'email'
    | 'password'
    | 'select'
    | 'currency'
    | 'text'
    | 'number'
    | 'date'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  iconType?: 'email' | 'password' | 'phone' | 'name'
  register?: UseFormRegister<any> //eslint-disable-line
  showPasswordTips?: boolean
  placeholder: string
  maxLength?: number
  value?: string
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
