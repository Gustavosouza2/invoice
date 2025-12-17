import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
} from '@/components/ui/dialog'

type ModalProps = {
  children: React.ReactNode
  onClose?: () => void
  description?: string
  isOpen: boolean
  title?: string
}

export const Modal = ({
  description,
  children,
  onClose,
  isOpen,
  title,
}: ModalProps) => {
  return (
    <Dialog modal onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent
        className={`w-full max-w-full min-h-screen md:max-w-[24rem]
          md:min-h-[36rem] flex flex-col rounded-none md:rounded-2xl border
          border-bg-tertiary bg-bg-primary text-text-primary shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-9 md:p-8`}
      >
        <DialogHeader>
          <div className="flex flex-col mt-2 md:mt-3 gap-1.5 justify-center items-center text-center">
            <DialogTitle className="text-[1.75rem] md:text-[1.9rem] font-poppins font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-text-tertiary text-sm md:text-base">
              {description}
            </DialogDescription>
          </div>
          <DialogClose
            className="border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-0"
            onClick={onClose}
          />
        </DialogHeader>
        <div className={`flex flex-col gap-6 md:gap-7`}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
