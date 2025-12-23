import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NoteButtonProps = {
  text: string
  value?: string
  disabled?: boolean
  className?: string
  onClick: () => void
  defaultValue?: string
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
  defaultValue,
  contentClassName,
  selectedType = '',
}: NoteButtonProps) => {
  const isSelected = selectedType === value

  return (
    <Button
      onClick={!disabled ? onClick : undefined}
      defaultValue={defaultValue}
      disabled={disabled}
      type="button"
      className={cn(
        'cursor-pointer bg-input-default border transition-colors w-32 h-28 flex justify-center items-center rounded-xl',
        isSelected
          ? 'border-bg-secondary hover:bg-input-default'
          : 'border-transparent',
        !isSelected && 'hover:border-zinc-700 hover:bg-input-primary',
        disabled && 'opacity-60 pointer-events-none',
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
