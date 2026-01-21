'use client'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import CurrencyInput from 'react-currency-input-field'
import InputMask from 'react-input-mask'
import { useState } from 'react'
import type React from 'react'

import { Input as InputShad } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'

import { type AbstractInputsProps } from './types'
import { Button } from '../../ui/button'
import { inputIcons } from './icons'

export const Input = ({
  showPasswordTips,
  onChangeCurrency,
  onValueChange,
  placeholder,
  maxLength,
  iconType,
  onChange,
  options,
  mask,
  type,
  ...props
}: AbstractInputsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleBlockKeyDownValuesInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      e.key === 'e' ||
      e.key === 'E' ||
      e.key === '+' ||
      e.key === '-' ||
      e.key === '.'
    ) {
      e.preventDefault()
    }
  }

  return (
    <>
      <div className="relative">
        {type === 'text' && (
          <div className="relative">
            {iconType && (
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {inputIcons({ iconType })}
              </div>
            )}
            {mask ? (
              <InputMask
                maskChar={null}
                mask={mask}
                onChange={onChange}
                value={(props.value as string | undefined) || ''}
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <InputShad
                    {...inputProps}
                    placeholder={placeholder || ''}
                    className={cn(
                      'h-11 rounded border border-transparent !bg-surface',
                      'text-text-tertiary placeholder:text-text-tertiary/70',
                      'focus-visible:ring-0 focus:border-border-focus',
                      iconType ? 'pl-10' : 'pl-3',
                    )}
                    onChange={onChange}
                    autoComplete="off"
                    type="text"
                  />
                )}
              </InputMask>
            ) : (
              <InputShad
                {...props}
                placeholder={placeholder || ''}
                className={cn(
                  'h-11 rounded border border-transparent !bg-surface',
                  'text-text-tertiary placeholder:text-text-tertiary/70',
                  'focus-visible:ring-0 focus:border-border-focus',
                  iconType ? 'pl-10' : 'pl-3',
                  props.className,
                )}
                value={(props.value as string | undefined) || ''}
                onChange={onChange}
                autoComplete="off"
                type="text"
              />
            )}
          </div>
        )}

        {type === 'currency' && (
          <div className="relative">
            <CurrencyInput
              className={cn(
                'w-full h-11 rounded text-sm',
                'border border-transparent bg-surface',
                'text-text-tertiary placeholder:text-text-tertiary/70',
                'focus:outline-none focus:ring-0 focus:border-border-focus',
                'focus-visible:outline-none focus-visible:ring-0 focus-visible:border-zinc-700',
                'pl-4',
              )}
              intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
              placeholder={placeholder}
              name={props.name}
              inputMode="decimal"
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
            />
          </div>
        )}

        {type === 'select' && (
          <Select
            value={(props.value as string | undefined) ?? undefined}
            onValueChange={onValueChange}
          >
            <SelectTrigger
              className="w-full rounded h-10 text-text-primary
              ring-0 focus:ring-0
        border border-transparent
        focus:border-border-focus focus-visible:ring-0 focus-visible:ring-offset-0
        bg-surface"
            >
              <SelectValue
                placeholder="Status"
                className="text-text-tertiary"
              />
            </SelectTrigger>
            <SelectContent className="border-border-muted bg-surface text-text-primary rounded">
              {options?.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.value}
                  className="focus:bg-surface-elevated text-text-tertiary"
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
              {iconType && (
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {inputIcons({ iconType })}
                </div>
              )}
              <InputShad
                className={cn(
                  'h-11 rounded placeholder:text-text-tertiary/70 text-text-tertiary border border-transparent focus-visible:ring-0 focus:border-border-focus bg-surface pr-10',
                  iconType ? 'pl-10' : 'pl-3',
                )}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete="off"
                maxLength={maxLength}
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
                    className="h-4 w-4 text-text-tertiary opacity-40"
                    aria-hidden="true"
                  />
                ) : (
                  <FaRegEyeSlash
                    className="h-4 w-4 text-text-tertiary opacity-40"
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
                <p className="text-sm text-text-tertiary opacity-5">
                  * The password must be at least 8 characters long
                </p>
              </div>
            )}
          </>
        )}

        {type === 'number' && (
          <>
            <InputShad
              onKeyDown={handleBlockKeyDownValuesInput}
              className={cn(
                'h-11 rounded border border-transparent bg-surface',
                'text-text-tertiary placeholder:text-text-tertiary/70',
                'focus-visible:ring-0 focus:border-border-focus',
                iconType ? 'pl-10' : 'pl-3',
                '[appearance:textfield]',
                '[&::-webkit-inner-spin-button]:appearance-none',
                '[&::-webkit-outer-spin-button]:appearance-none',
                '[&::-webkit-inner-spin-button]:m-0',
              )}
              placeholder={placeholder}
              name={props.name}
              onBlur={props.onBlur}
              value={
                props.value === null ||
                props.value === undefined ||
                props.value === ''
                  ? ''
                  : String(props.value)
              }
              onChange={(e) => {
                let value = e.target.value

                value = value.replace(/[^0-9]/g, '')

                if (maxLength && value.length > maxLength) {
                  value = value.slice(0, maxLength)
                }

                const syntheticEvent = {
                  ...e,
                  target: { ...e.target, value },
                } as React.ChangeEvent<HTMLInputElement>

                onChange?.(syntheticEvent)
              }}
              autoComplete="off"
              inputMode="numeric"
              type="text"
            />
            {maxLength && (
              <h1 className="text-xs text-text-tertiary/70 absolute bottom-3 right-4">
                {String(props.value ?? '').length} / {maxLength}
              </h1>
            )}
          </>
        )}

        {type === 'date' && (
          <InputMask
            mask={mask ?? ''}
            maskChar={null}
            value={(props.value as string | undefined) || ''}
            onChange={onChange}
          >
            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
              <InputShad
                {...inputProps}
                placeholder={placeholder || 'DD/MM/YYYY'}
                className={cn(
                  'h-11 rounded border border-transparent !bg-surface',
                  'text-text-tertiary placeholder:text-text-tertiary/70',
                  'focus-visible:ring-0 focus:border-border-focus',
                  iconType ? 'pl-10' : 'pl-3',
                )}
                autoComplete="off"
                type="text"
              />
            )}
          </InputMask>
        )}

        {type === 'textArea' && (
          <Textarea
            placeholder={placeholder}
            onChange={(e) =>
              onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            className={cn(
              'h-11 rounded border border-transparent !bg-surface',
              'text-text-tertiary placeholder:text-text-tertiary/70',
              'focus-visible:ring-0 focus:border-border-focus resize-y max-h-28',
              iconType ? 'pl-10' : 'pl-3',
            )}
            defaultValue={props.defaultValue}
          />
        )}
      </div>
    </>
  )
}
