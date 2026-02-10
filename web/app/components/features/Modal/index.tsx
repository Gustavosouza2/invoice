import { DialogContent, DialogClose, Dialog } from '@/components/ui/dialog'

import { ModalHeader } from './parts/ModalHeader'
import { ModalFooter } from './parts/ModalFooter'

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
        className={`w-full max-w-full h-dvh md:max-w-[26rem] md:h-[38rem] flex flex-col rounded-none md:rounded-2xl border
          border-border-muted bg-bg-primary text-text-primary shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 md:p-8 overflow-y-auto md:overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end">
            <DialogClose
              className="border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-0"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-7 h-full">
            <ModalHeader title={title} description={description} />
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export { ModalHeader, ModalFooter }
