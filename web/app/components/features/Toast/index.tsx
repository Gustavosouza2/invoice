import { toast } from 'sonner'

type ToastProps = {
  type: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
  description?: string
  message: string
}

export const Toast = ({
  type = 'info',
  description,
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
  const container = `${variants[type]} rounded-2xl px-4 py-3 w-[min(420px,calc(100vw-2rem))] inline-flex flex-col`
  const title = 'font-medium'
  const desc = 'text-sm opacity-90 mt-1'

  const options: Record<string, unknown> = {
    position: 'top-right',
    duration: 5000,
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
