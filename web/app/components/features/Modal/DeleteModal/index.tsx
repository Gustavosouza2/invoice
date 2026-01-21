import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '../../Button/DefaultButton'

type DeleteModalProps = {
  onDelete: (invoiceId?: string) => void
  description?: string
  onClose: () => void
  invoiceId?: string
  isOpen: boolean
  title?: string
}

export const DeleteModal = ({
  title,
  isOpen,
  onClose,
  onDelete,
  invoiceId,
  description,
}: DeleteModalProps) => {
  if (!isOpen) return null

  return (
    <Dialog modal onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent
        className={`w-full max-w-full h-screen md:max-w-[25rem] md:h-[15rem] flex flex-col rounded-none md:rounded-2xl border
          border-border-muted bg-bg-primary text-text-primary shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 md:p-8`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end">
            <DialogClose
              className="border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-0"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-7 h-full">
            <div className="flex flex-col gap-2 justify-center items-center">
              <DialogTitle className="text-modal-title md:text-[1.5rem] font-poppins font-semibold text-text-primary">
                {title ?? 'Excluir nota fiscal?'}
              </DialogTitle>
              <DialogDescription className="text-text-tertiary text-xs md:text-sm text-center">
                {description ??
                  'Essa ação não pode ser desfeita e voce perderá todos os dados.'}
              </DialogDescription>
            </div>

            <div className="flex mt-4 gap-4">
              <Button type="secondary" text="CANCELAR" onClick={onClose} />
              <Button
                type="delete"
                text="EXCLUIR"
                htmlType="submit"
                onClick={() => onDelete(invoiceId)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
