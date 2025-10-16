import { Button as ButtonShad } from '../../ui/button'
import { Progress } from '../../ui/progress'
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

export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
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
      }
    } else {
      setProgress(0)
    }
  }, [isLoading])

  return (
    <ButtonShad
      className="w-full rounded h-10 bg-[#212121] text-[#FFFFFF] font-sans font-medium hover:bg-neutral-900 hover:text-slate-300 relative"
      disabled={isLoading}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden rounded">
        {isLoading && (
          <div className="absolute inset-0 w-full h-full ">
            <Progress
              value={progress}
              className="w-full h-full rounded-none bg-transparent [&>div]:bg-white/20 [&>div]:transition-all [&>div]:duration-500"
            />
          </div>
        )}
      </div>
      <span className="relative z-10">{children}</span>
    </ButtonShad>
  )
}
