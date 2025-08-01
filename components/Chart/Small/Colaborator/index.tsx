'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An area chart with gradient fill'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primaryColor)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chartYellow)',
  },
} satisfies ChartConfig

export function ChartAreaGradient() {
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
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='mobile'
              type='natural'
              fill='url(#fillMobile)'
              fillOpacity={0.4}
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='desktop'
              type='natural'
              fill='url(#fillDesktop)'
              fillOpacity={0.4}
              stroke='var(--color-desktop)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
