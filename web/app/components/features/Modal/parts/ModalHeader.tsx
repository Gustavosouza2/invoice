import { DialogDescription, DialogTitle } from '@/components/ui/dialog'

type ModalHeaderProps = {
  title?: string
  description?: string
}

export const ModalHeader = ({ title, description }: ModalHeaderProps) => (
  <div className="flex flex-col gap-2 justify-start items-center text-center">
    {title && (
      <DialogTitle className="text-modal-title md:text-[1.95rem] font-poppins font-semibold text-text-primary">
        {title}
      </DialogTitle>
    )}
    {description && (
      <DialogDescription className="text-text-tertiary text-sm md:text-base">
        {description}
      </DialogDescription>
    )}
  </div>
)
