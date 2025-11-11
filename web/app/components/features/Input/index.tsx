import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import CurrencyInput from 'react-currency-input-field'
import { useState } from 'react'

import { Input as InputShad } from '@/components/ui/input'
import { type AbstractInputsProps } from './types'
import { Button } from '../../ui/button'
import {
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'

export const Input = ({
  showPasswordTips,
  onChangeCurrency,
  onValueChange,
  placeholder,
  options,
  onChange,
  type,
  ...props
}: AbstractInputsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      <div className="relative">
        {type === 'text' && (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MdOutlineEmail className="text-text-tertiary" />
              </div>
              <InputShad
                className="h-11 rounded placeholder:text-text-tertiary
                  text-text-tertiary border border-transparent
                  focus-visible:ring-0 focus:border-zinc-700
                  bg-input-default pl-10"
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                type="text"
                {...props}
              />
            </div>
          </>
        )}

        {type === 'currency' && (
          <CurrencyInput
            className="h-10 rounded px-3 text-sm w-full
          placeholder:text-[#A1A1AA] text-zinc-200
          bg-zinc-900
          border border-transparent
          focus:border-zinc-700
          ring-0 focus:ring-0 focus:ring-offset-0
          focus-visible:ring-0 focus-visible:ring-offset-0
          focus:outline-none focus-visible:outline-none"
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            placeholder={placeholder}
            name={props.name}
            value={
              typeof props.value === 'number'
                ? String(props.value)
                : (props.value as string | undefined)
            }
            onValueChange={(value, name, values) => {
              onChangeCurrency?.(value ?? '', name, values)
            }}
            allowDecimals={true}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$"
          />
        )}

        {type === 'select' && (
          <Select
            value={(props.value as string | undefined) ?? undefined}
            onValueChange={onValueChange}
          >
            <SelectTrigger
              className="w-full rounded h-10 text-zinc-200
              ring-0 focus:ring-0
        border border-transparent
        focus:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0
        bg-zinc-900"
            >
              <SelectValue placeholder="Status" className="text-[#A1A1AA]" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-900 text-zinc-200 rounded">
              {options?.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.value}
                  className="focus:bg-zinc-800 text-[#A1A1AA]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {type === 'password' && (
          <>
            <div className="relative flex">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MdOutlineLock className="text-text-tertiary" />
              </div>
              <InputShad
                className="h-11 rounded placeholder:text-text-tertiary text-text-tertiary border border-transparent focus-visible:ring-0 focus:border-zinc-700 bg-input-default pl-10 pr-10"
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete="off"
                {...props}
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center px-2 hover:bg-transparent pointer-events-auto"
                onClick={() => setShowPassword((prev) => !prev)}
                variant="ghost"
                type="button"
                size="sm"
              >
                {showPassword ? (
                  <FaRegEye
                    className="h-4 w-4 text-zinc-300 opacity-40"
                    aria-hidden="true"
                  />
                ) : (
                  <FaRegEyeSlash
                    className="h-4 w-4 text-zinc-300 opacity-40"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
            {showPasswordTips && (
              <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-zinc-300 opacity-5">
                  * The password must be at least 8 characters long
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
