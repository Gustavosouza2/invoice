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

import { type DataTableProps } from './types'
import { Pagination } from '../Pagination'

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
    return (
      <>
        {isLoading ? (
          <Skeleton className="w-full h-96 rounded-xl" />
        ) : (
          <div className="w-full border border-[#FFFA]/10 rounded-xl">
            <div className="rounded-xl p-5 w-full">
              {/* RESPONSIVE DESKTOP */}
              <div className="hidden custom:block">
                <Table className="w-full">
                  {data && data?.length >= 1 && (
                    <>
                      <TableHeader>
                        <TableRow className="border-b border-[#FFFA]/20 hover:bg-transparent">
                          {columns.map((column, index) => (
                            <TableHead
                              className={`w-${column.size} text-gray-400 font-medium place-items-center`}
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
                            className="border-b w-full border-[#FFFA]/10 hover:bg-[#FFFA]/5 transition-colors"
                          >
                            {columns.map((column, columnIndex) => (
                              <TableCell
                                className={`w-${column.size}`}
                                key={`tr-${columnIndex}`}
                              >
                                {parsedDataTable(
                                  items,
                                  BADGE_PROPS_COLOR,
                                  column,
                                  data,
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              </div>

              {/* RESPONSIVE MOBILE */}
              <div className="block custom:hidden">
                {data && data?.length >= 1 && (
                  <div className="space-y-4">
                    {data.map(({ onClickRow, ...data }, dataIndex) => (
                      <div
                        key={`mobile-row-${dataIndex}`}
                        className="border-b border-[#FFFA]/10 pb-4 last:border-b-0 hover:bg-[#FFFA]/5 transition-colors rounded-lg p-3 -m-3 cursor-pointer"
                        onClick={onClickRow}
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className="flex flex-col space-y-1 flex-1 min-w-0 pr-4">
                            <div className="text-sm font-medium text-gray-200 truncate">
                              {data.name}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {data.email}
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                            <div className="text-sm">
                              {parsedDataTable(
                                items,
                                BADGE_PROPS_COLOR,
                                { name: 'status' },
                                data,
                              )}
                            </div>
                            <div className="text-xs text-gray-400">
                              {parsedDataTable(
                                items,
                                BADGE_PROPS_COLOR,
                                { name: 'amount' },
                                data,
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
