import { forwardRef } from 'react'
import { Button } from '@/components/ui/button'

type IconButtonProps = {
  onClick?: () => void
  Icon: JSX.Element
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ onClick, Icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        onClick={onClick}
        className="text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary rounded-xl transition-all duration-200"
        {...props}
      >
        {Icon}
      </Button>
    )
  },
)

IconButton.displayName = 'IconButton'
