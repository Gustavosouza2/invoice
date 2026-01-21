import { type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

import { Button as ButtonShad } from '../../../ui/button'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  htmlType?: 'button' | 'submit' | 'reset'
  type: 'default' | 'delete' | 'secondary'
  isLoading?: boolean
  text: string
}

export const Button = ({
  type,
  text,
  isLoading,
  htmlType = 'button',
  ...props
}: ButtonProps) => {
  if (type === 'delete') {
    return (
      <ButtonShad
        type={htmlType}
        className="w-full h-11 rounded bg-delete-background
      font-inter font-medium disabled:opacity-60
      border border-delete-border
      hover:border-delete-border/80 hover:bg-delete-hover
      text-delete-text"
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <h1 className="relative z-10">{text}</h1>
        )}
      </ButtonShad>
    )
  }

  if (type === 'secondary') {
    return (
      <ButtonShad
        type={htmlType}
        className="w-full h-11 rounded bg-surface
  font-inter font-medium disabled:opacity-60
    hover:bg-surface-hover
    text-text-primary/80
    hover:text-text-primary"
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <h1 className="relative z-10">{text}</h1>
        )}
      </ButtonShad>
    )
  }

  return (
    <ButtonShad
      type={htmlType}
      className="w-full h-11 rounded bg-accent
  font-inter font-medium disabled:opacity-60
  hover:bg-accent-hover
  text-text-quaternary"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <h1 className="relative z-10">{text}</h1>
      )}
    </ButtonShad>
  )
}
