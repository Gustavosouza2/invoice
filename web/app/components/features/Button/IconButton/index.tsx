import { Button } from '@/components/ui/button'

type IconButtonProps = {
  onClick?: () => void
  Icon: JSX.Element
}

export const IconButton = ({ onClick, Icon }: IconButtonProps) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClick}
      className="text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary rounded-xl transition-all duration-200"
    >
      {Icon}
    </Button>
  )
}
