import { type ContextMenuItemsProps } from '@/components/features/ContextMenuItems/types'
import { ContextMenuItems } from '@/components/features/ContextMenuItems'
import { type TableColumn } from '@/components/features/Table/types'

export const parsedDataTable = (
  items?: (rowData: any) => ContextMenuItemsProps['items'],
  BADGE_PROPS_COLOR?: Record<string, JSX.Element>,
  column?: TableColumn<any>,
  data?: any,
) => {
  if (column?.name === 'amount')
    return Number(data[column.name]).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

  if (column?.name === 'actions' && items) {
    const menuItems = items(data)
    return menuItems ? <ContextMenuItems items={menuItems} /> : null
  }

  if (column?.name === 'status') return BADGE_PROPS_COLOR?.[data[column.name]]

  return data?.[column?.name]
}
