type ModalFooterProps = {
  children: React.ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => (
  <div className="w-full mt-auto">{children}</div>
)
