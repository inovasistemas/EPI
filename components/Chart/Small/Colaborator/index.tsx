'use client'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An area chart with gradient fill'

const chartConfig = {
  last_week: {
    label: 'Anterior',
    color: 'var(--chartGray)',
  },
  this_week: {
    label: 'Atual',
    color: 'var(--primaryColor)',
  },
} satisfies ChartConfig

type ChartProps = {
  day: string
  last_week: number
  this_week: number
}

type ChartAreaGradientProps = {
  chart: ChartProps[]
}

export function ChartAreaGradient({ chart }: ChartAreaGradientProps) {
  const chartData = chart

  return (
    <Card className='bg-transparent shadow-none -ml-[2%] p-0 border-none w-[104%]'>
      <CardContent className='m-0 p-0 w-full h-44'>
        <ChartContainer config={chartConfig} className='m-0 p-0 w-full h-44'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className=''
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className='border-[--border]' />}
            />
            <defs>
              <linearGradient
                id='filllast_week'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
                stroke='#8884d8'
              >
                <stop
                  offset='5%'
                  stopColor='var(--color-last_week)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-last_week)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillthis_week' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-this_week)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-this_week)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='this_week'
              type='natural'
              fill='url(#fillthis_week)'
              fillOpacity={0.4}
              stroke='var(--color-this_week)'
              stackId='a'
              strokeWidth={2}
            />
            <Area
              dataKey='last_week'
              type='natural'
              fill='url(#filllast_week)'
              fillOpacity={0.4}
              stroke='var(--color-last_week)'
              stackId='a'
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
