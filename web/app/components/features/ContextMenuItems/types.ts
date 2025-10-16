export type ContextMenuItemsProps = {
  items: Array<{
    icon: () => JSX.Element
    onClick?: VoidFunction
    onOpen?: VoidFunction
    label: string
  }>
}
