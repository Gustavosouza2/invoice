'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import { format, parse, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React, { useMemo } from 'react'

import { capitalizeFirstLetter } from '@/utils/capitalize'
import { Skeleton } from '@/components/ui/skeleton'
import { type Invoice } from '@/types/invoice'
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

type ChartProps = {
  isLoading: boolean
  data: Invoice[]
}

const processDataByMonth = (data: ChartProps['data']) => {
  const monthlyTotals: Record<string, number> = {}
  const now = new Date()
  const threeMonthsAgo = subMonths(now, 2)

  const filteredData = data?.filter((item) => {
    const createdAtDate = new Date(item.createdAt)
    if (isNaN(createdAtDate.getTime())) return false

    const itemMonth = new Date(
      createdAtDate.getFullYear(),
      createdAtDate.getMonth(),
      1,
    )
    const cutoffMonth = new Date(
      threeMonthsAgo.getFullYear(),
      threeMonthsAgo.getMonth(),
      1,
    )

    return itemMonth >= cutoffMonth
  })

  filteredData?.forEach((item) => {
    const createdAtDate = new Date(item.createdAt)
    const monthKey = isNaN(createdAtDate.getTime())
      ? format(new Date(), 'MM-yyyy')
      : format(createdAtDate, 'MM-yyyy')

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0
    }
    monthlyTotals[monthKey] += item.serviceValue || 0
  })

  const lastThreeMonths: string[] = []
  for (let i = 2; i >= 0; i--) {
    const monthDate = subMonths(now, i)
    lastThreeMonths.push(format(monthDate, 'MM-yyyy'))
  }

  lastThreeMonths.forEach((monthKey) => {
    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0
    }
  })

  const sortedEntries = Object.entries(monthlyTotals)
    .filter(([monthKey]) => lastThreeMonths.includes(monthKey))
    .sort(([keyA], [keyB]) => {
      const [monthA, yearA] = keyA.split('-')
      const [monthB, yearB] = keyB.split('-')
      const dateA = new Date(Number(yearA), Number(monthA) - 1, 1)
      const dateB = new Date(Number(yearB), Number(monthB) - 1, 1)
      return dateA.getTime() - dateB.getTime()
    })

  return sortedEntries.map(([monthKey, total]) => {
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
}

const chartConfig = {
  desktop: {
    label: 'Receita Líquida',
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
        <Card className="h-[300px] rounded-xl border-accent/40 bg-gradient-to-br from-bg to-bg-primary shadow-xl/40 hover:shadow-xl/60 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-text-primary">Situação Mensal</CardTitle>
            <CardDescription className="text-text-tertiary">
              {capitalizeFirstLetter(currentMonth)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[180px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart
                  margin={{ top: 15, right: 15, bottom: 0, left: 0 }}
                  className="text-text-primary"
                  data={chartData}
                  height={180}
                  width={500}
                >
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      className="fill-text-tertiary bg-transparent"
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
