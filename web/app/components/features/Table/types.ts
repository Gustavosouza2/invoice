import { type ContextMenuItemsProps } from '@/components/features/ContextMenuItems/types'
import { type IconType } from 'react-icons'

export interface TableColumn<T extends string> {
  label?: string
  size?: string
  name: T
}

export interface DataTableProps<T extends Array<any>> {
  items: (rowData: any) => ContextMenuItemsProps['items']
  onPageChange: (page: number) => void
  currentPage: number
  isLoading?: boolean
  totalPages: number
  title?: string
  data: T
  footer?: {
    onClick?: () => void
    icon?: IconType
    message: string
  }
  columns: Readonly<TableColumn<any>[]>
}
