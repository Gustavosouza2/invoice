import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NoteButtonProps = {
  text: string
  value?: string
  disabled?: boolean
  className?: string
  onClick: () => void
  icon: React.ReactNode
  selectedType?: string
  contentClassName?: string
}

export const NoteButton = ({
  icon,
  text,
  value,
  onClick,
  disabled,
  className,
  contentClassName,
  selectedType = '',
}: NoteButtonProps) => {
  const isSelected = selectedType === value

  const borderRender = isSelected
    ? 'border-bg-secondary hover:bg-input-default'
    : 'border-transparent'

  const hoverRender = isSelected
    ? 'hover:border-bg-secondar bg-input-primary'
    : 'hover:border-zinc-700 hover:bg-input-primary'

  const disableRender = disabled && 'opacity-60 pointer-events-none'

  return (
    <Button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      type="button"
      className={cn(
        'cursor-pointer bg-input-default border transition-colors w-32 h-28 flex justify-center items-center rounded-xl',
        borderRender,
        hoverRender,
        disableRender,
        className,
      )}
      value={value}
    >
      <div
        className={cn(
          'flex flex-col gap-1 justify-center items-center p-4 text-text-primary',
          contentClassName,
        )}
      >
        <p className="font-inter text-sm font-medium">{text}</p>
        <div className="">{icon}</div>
      </div>
    </Button>
  )
}
