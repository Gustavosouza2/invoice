/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from 'react'

import { parsedDataTable } from '@/utils/parsed-data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  TableHeader,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from '@/components/ui/table'

import { type DataTableProps, type TableColumn } from './types'
import { Pagination } from '../Pagination'

const COLUMN_WIDTH_MAP: Record<string, string> = {
  '0': 'w-[50px] min-w-[50px] max-w-[50px]',
  '20': 'w-[30%] lg:w-[27.5%] min-w-[120px] lg:min-w-[180px]',
  '80': 'w-[40%] lg:w-[45%] min-w-[180px] lg:min-w-[250px]',
  default: 'flex-1 min-w-[100px]',
}

const getColumnWidth = (column: TableColumn<any>) => {
  const isActions = column.name === 'actions' || column.size === '0'
  if (isActions) return COLUMN_WIDTH_MAP['0']
  return COLUMN_WIDTH_MAP[column.size || 'default'] || COLUMN_WIDTH_MAP.default
}

const isActionsColumn = (column: TableColumn<any>) =>
  column.name === 'actions' || column.size === '0'

const BADGE_PROPS_COLOR: Record<string, JSX.Element> = {
  done: (
    <Badge className="bg-zinc-800 rounded-xl text-green-500 font-mono font-medium hover:bg-zinc-900">
      Pago
    </Badge>
  ),
  pending: (
    <Badge className="bg-zinc-800 text-orange-500  font-mono font-medium rounded-xl hover:bg-zinc-900">
      Pendente
    </Badge>
  ),
}

export const DataTable = React.memo(
  <T extends Array<any>>({
    data,
    items,
    columns,
    isLoading,
    totalPages,
    currentPage,
    onPageChange,
  }: DataTableProps<T>) => {
    const containerClassName = `w-full border border-bg-secondary/20
      hover:shadow-xl/60 transition-all duration-300 hover:border-bg-secondary/60
      bg-gradient-to-br from-bg-default to-bg-primary rounded-xl`

    return (
      <>
        {isLoading ? (
          <div className={containerClassName}>
            <div className="rounded-xl p-3 sm:p-4 lg:p-5 w-full">
              <div className="hidden sm:block">
                <div className="w-full overflow-x-auto">
                  <div className="w-full min-w-[600px] lg:min-w-[800px]">
                    <div className="space-y-4">
                      <div className="flex gap-4 pb-4 border-b border-bg-secondary/20">
                        <Skeleton className="flex-1 h-6 rounded" />
                        <Skeleton className="w-[27.5%] h-6 rounded" />
                        <Skeleton className="w-[27.5%] h-6 rounded" />
                        <Skeleton className="w-[50px] h-6 rounded" />
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 py-3">
                          <Skeleton className="flex-1 h-8 rounded" />
                          <Skeleton className="w-[27.5%] h-8 rounded" />
                          <Skeleton className="w-[27.5%] h-8 rounded" />
                          <Skeleton className="w-[50px] h-8 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block sm:hidden space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-b border-[#FFFA]/10 pb-4 last:border-b-0 rounded-lg p-3"
                  >
                    <Skeleton className="w-3/4 h-6 mb-4 rounded" />
                    <Skeleton className="w-1/2 h-5 mb-4 rounded" />
                    <Skeleton className="w-2/3 h-5 rounded" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-6">
                <Skeleton className="w-8 h-8 rounded" />
                <Skeleton className="w-8 h-8 rounded" />
                <Skeleton className="w-8 h-8 rounded" />
                <Skeleton className="w-12 h-8 rounded" />
              </div>
            </div>
          </div>
        ) : (
          <div className={containerClassName}>
            <div className="rounded-xl p-3 sm:p-4 lg:p-5 w-full">
              {/* RESPONSIVE DESKTOP & TABLET */}
              <div className="hidden sm:block">
                <div className="w-full overflow-x-auto">
                  <Table className="w-full min-w-[600px] lg:min-w-[800px]">
                    {data && data?.length >= 1 && (
                      <>
                        <TableHeader>
                          <TableRow className="border-b border-bg-secondary/20 hover:bg-transparent">
                            {columns.map((column, index) => (
                              <TableHead
                                className={`${getColumnWidth(column)} text-gray-400 font-medium text-sm lg:text-base ${isActionsColumn(column) ? 'text-right' : ''}`}
                                key={`th-${index}`}
                              >
                                {column.label}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                          {data.map(({ ...data }, dataIndex) => (
                            <TableRow
                              key={`tr-${dataIndex}`}
                              className="border-b w-full border-[#FFFA]/10 hover:bg-[#FFFA]/5 transition-colors relative"
                            >
                              {columns.map((column, columnIndex) => {
                                const isActions = isActionsColumn(column)
                                return (
                                  <TableCell
                                    className={`${getColumnWidth(column)} break-words text-sm lg:text-base py-3 lg:py-4 ${isActions ? 'text-right pr-0' : ''}`}
                                    key={`tr-${columnIndex}`}
                                  >
                                    <div
                                      className={
                                        isActions
                                          ? 'flex justify-end items-center'
                                          : ''
                                      }
                                    >
                                      {parsedDataTable(
                                        items,
                                        BADGE_PROPS_COLOR,
                                        column,
                                        data,
                                      )}
                                    </div>
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </div>
              </div>

              {/* RESPONSIVE MOBILE */}
              <div className="block sm:hidden">
                {data && data?.length >= 1 && (
                  <div className="space-y-4">
                    {data.map(({ onClickRow, ...data }, dataIndex) => {
                      const primaryColumn = columns[0]
                      const secondaryColumn = columns[columns.length - 2]
                      const actionColumn = columns[columns.length - 1]
                      const tercenaryColumn = columns[columns.length - 3]

                      return (
                        <div
                          key={`mobile-row-${dataIndex}`}
                          className="border-b border-[#FFFA]/10 pb-4 last:border-b-0 hover:bg-[#FFFA]/5
                          transition-colors rounded-lg p-3 -m-3 cursor-pointer"
                          onClick={onClickRow}
                        >
                          <div className="flex justify-between items-start w-full gap-4 p-3">
                            <div className="flex flex-col space-y-2 flex-1 min-w-0">
                              {primaryColumn && (
                                <div className="flex flex-col space-y-1 mb-6">
                                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                                    {primaryColumn.label}
                                  </div>
                                  <div className="text-sm font-medium text-gray-200 break-words">
                                    {parsedDataTable(
                                      items,
                                      BADGE_PROPS_COLOR,
                                      primaryColumn,
                                      data,
                                    )}
                                  </div>
                                </div>
                              )}

                              {secondaryColumn && (
                                <div className="flex flex-col space-y-1 mb-6">
                                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                                    {secondaryColumn.label}
                                  </div>
                                  <div className="text-sm font-medium text-gray-200 break-words">
                                    {parsedDataTable(
                                      items,
                                      BADGE_PROPS_COLOR,
                                      secondaryColumn,
                                      data,
                                    )}
                                  </div>
                                </div>
                              )}

                              {tercenaryColumn && (
                                <div className="flex flex-col space-y-1">
                                  <div className="text-xs text-gray-400 uppercase tracking-wide mt-6">
                                    {tercenaryColumn.label}
                                  </div>
                                  <div className="text-sm font-medium text-gray-200">
                                    {parsedDataTable(
                                      items,
                                      BADGE_PROPS_COLOR,
                                      tercenaryColumn,
                                      data,
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {actionColumn && (
                              <div className="flex flex-col items-end space-y-1 flex-shrink-0 ">
                                <div className="text-xs text-gray-400 uppercase tracking-wide">
                                  {actionColumn.label}
                                </div>
                                <div className="text-sm font-medium text-gray-200">
                                  {parsedDataTable(
                                    items,
                                    BADGE_PROPS_COLOR,
                                    actionColumn,
                                    data,
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </>
    )
  },
)

DataTable.displayName = 'DataTable'
