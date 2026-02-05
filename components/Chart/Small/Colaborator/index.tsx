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
  expected: {
    label: 'Esperado',
    color: 'var(--chartYellow)',
  },
  exited: {
    label: 'Realizado',
    color: 'var(--primaryColor)',
  },
} satisfies ChartConfig

type ChartProps = {
  day: string
  expected: number
  exited: number
}

type ChartAreaGradientProps = {
  chart: ChartProps[]
}

export function ChartAreaGradient({ chart }: ChartAreaGradientProps) {
  const chartData = chart

  return (
    <Card className='bg-transparent shadow-none mb-6 -ml-[2%] p-0 border-none w-[104%]'>
      <CardContent className='m-0 p-0 w-full h-44'>
        <ChartContainer config={chartConfig} className='m-0 p-0 w-full h-44'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12,
              bottom: 12
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
                id='fillexpected'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
                stroke='#8884d8'
              >
                <stop
                  offset='5%'
                  stopColor='var(--color-expected)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expected)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillexited' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-exited)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-exited)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='expected'
              type='natural'
              fill='url(#fillexpected)'
              fillOpacity={0}
              stroke='var(--color-expected)'
              strokeWidth={2}
            />

            <Area
              dataKey='exited'
              type='natural'
              fill='url(#fillexited)'
              fillOpacity={0}
              stroke='var(--color-exited)'
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
