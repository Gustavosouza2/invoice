import { toast } from 'sonner'

type ToastProps = {
  type: 'success' | 'error' | 'warning' | 'info'
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  onClose?: () => void
  description?: string
  duration?: number
  message: string
}

export const Toast = ({
  position = 'top-right',
  type = 'info',
  description,
  duration,
  onClose,
  message,
}: ToastProps) => {
  const ringThin = 'ring-2 ring-inset'
  const variants: Record<ToastProps['type'], string> = {
    success: [
      'text-green-400',
      'bg-green-500/20',
      ringThin,
      'ring-green-400/40',
    ].join(' '),
    error: ['text-red-400', 'bg-red-500/20', ringThin, 'ring-red-400/40'].join(
      ' ',
    ),
    warning: [
      'text-amber-400',
      'bg-amber-500/20',
      ringThin,
      'ring-amber-400/40',
    ].join(' '),
    info: [
      'text-text-secondary',
      'bg-bg-primary',
      ringThin,
      'ring-text-secondary/50',
    ].join(' '),
  }

  const outer = 'bg-bg-primary rounded-2xl p-[0px] shadow-md'
  const container = `${variants[type]} rounded-2xl px-4 py-3 min-w-[280px] max-w-[420px] inline-flex flex-col`
  const title = 'font-medium'
  const desc = 'text-sm opacity-90 mt-1'

  const options: Record<string, unknown> = {
    duration,
    position,
    unstyled: true,
  }
  if (onClose) options.onDismiss = onClose

  return toast.custom(
    () => (
      <div className={outer}>
        <div className={container}>
          <div className={title}>{message}</div>
          {description ? <div className={desc}>{description}</div> : null}
        </div>
      </div>
    ),
    options,
  )
}
