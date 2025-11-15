'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import React, { useMemo } from 'react'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from '@/components/ui/card'
import {
  ChartTooltipContent,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'

import { capitalizeFirstLetter } from '@/utils/capitalize'
import { Skeleton } from '@/components/ui/skeleton'
import { type Invoice } from '@/types/invoice'

type ChartProps = {
  isLoading: boolean
  data: Invoice[]
}

const processDataByMonth = (data: ChartProps['data']) => {
  const monthlyTotals: Record<string, number> = {}

  data?.forEach((item) => {
    const createdAtDate = new Date(item.createdAt)
    const monthKey = isNaN(createdAtDate.getTime())
      ? format(new Date(), 'MM-yyyy')
      : format(createdAtDate, 'MM-yyyy')

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0
    }
    monthlyTotals[monthKey] += item.amount
  })

  return Object.entries(monthlyTotals)
    .map(([monthKey, total]) => {
      const [month, year] = monthKey.split('-')
      const date = parse(`${year}-${month}-01`, 'yyyy-MM-dd', new Date())
      const monthName = capitalizeFirstLetter(
        format(date, 'MMMM', { locale: ptBR }),
      )

      return {
        month: monthName,
        desktop: total,
      }
    })
    .sort((a, b) => {
      const dateA = parse(a.month, 'MMMM', new Date(), { locale: ptBR })
      const dateB = parse(b.month, 'MMMM', new Date(), { locale: ptBR })
      return dateA.getTime() - dateB.getTime()
    })
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
}

const currentMonth = format(new Date(), 'MMMM yyyy', { locale: ptBR })

export const Chart = React.memo(({ isLoading, data }: ChartProps) => {
  const chartData = useMemo(() => processDataByMonth(data), [data])

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-72 rounded-xl" />
      ) : (
        <Card className="h-[300px] rounded-xl border border-[#FFFA]/10 bg-[#0E0E10]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#D1D1D2]">Situação Mensal</CardTitle>
            <CardDescription className="text-[#A1A1AA]">
              {capitalizeFirstLetter(currentMonth)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[180px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart
                  margin={{ top: 15, right: 15, bottom: 0, left: 0 }}
                  className="text-[#D1D1D2]"
                  data={chartData}
                  height={180}
                  width={500}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    dataKey="month"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      className="fill-#A1A1AA bg-transparent"
                      position="top"
                      offset={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
})

Chart.displayName = 'Chart'
