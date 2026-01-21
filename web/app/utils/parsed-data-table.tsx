/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ContextMenuItemsProps } from '@/components/features/ContextMenuItems/types'
import { ContextMenuItems } from '@/components/features/ContextMenuItems'
import { type TableColumn } from '@/components/features/Table/types'
import { Invoice } from '@/types/invoice'

export const parsedDataTable = (
  items?: (rowData: Invoice) => ContextMenuItemsProps['items'],
  column?: TableColumn<any>,
  data?: any,
) => {
  if (column?.name === 'serviceValue') {
    const value = data[column.name]
    if (value !== undefined && value !== null) {
      return Number(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })
    }
  }

  if (column?.name === 'actions' && items) {
    const menuItems = items(data)
    return menuItems ? <ContextMenuItems items={menuItems} /> : null
  }

  return data?.[column?.name]
}
