import { Button as ButtonShad } from '../../ui/button'
import { Progress } from '../../ui/progress'
import { cn } from '../../../lib/utils'
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useState,
  useEffect,
} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
}

export const Button = ({
  className,
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setProgress(0)
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 100
          }
          return Math.min(oldProgress + 10, 100)
        })
      }, 500)

      return () => {
        clearInterval(timer)
        setProgress(0)
      }
    } else {
      setProgress(0)
    }
  }, [isLoading])

  return (
    <ButtonShad
      className={cn('relative', className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
          <Progress
            value={progress}
            className="w-full h-full rounded-none bg-transparent [&>div]:bg-white/20 [&>div]:transition-all [&>div]:duration-500"
          />
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </ButtonShad>
  )
}
