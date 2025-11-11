import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import { Button as ButtonShad } from '../../ui/button'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
}

export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <ButtonShad
      className="w-full h-11 rounded bg-bg-secondary
      font-inter font-medium disabled:opacity-60
      hover:bg-hover-yellow
      text-text-quaternary"
      disabled={isLoading}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </ButtonShad>
  )
}
