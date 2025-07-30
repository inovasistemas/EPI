'use client'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart with a custom label'

const chartData = [
  { month: 'Manutenção Máquinas', cost: 186 },
  { month: 'Operação Máquinas', cost: 305 },
  { month: 'Logística Interna', cost: 237 },
]

const chartConfig = {
  cost: {
    label: 'Recursos',
    color: 'var(--textPrimary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig

export function ChartCost() {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <CardContent className='p-0 w-full h-full'>
        <ChartContainer
          config={chartConfig}
          className='w-full'
          style={{ height: `${(chartData.length + 1) * 32}px` }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              right: 30,
            }}
            barCategoryGap={2}
            barSize={32}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='month'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey='cost' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='line'
                  className='shadow-xl border-[--border]'
                  labelKey='month'
                  labelFormatter={label => label}
                  formatter={value =>
                    value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }
                />
              }
            />
            <Bar
              dataKey='cost'
              layout='vertical'
              fill='var(--color-cost)'
              radius={12}
            >
              <LabelList
                dataKey='month'
                position='insideLeft'
                offset={8}
                className='fill-white font-medium text-sm'
                fontSize={12}
              />
              <LabelList
                dataKey='cost'
                position='right'
                offset={8}
                className='fill-foreground font-medium text-sm'
                fontSize={12}
                formatter={(value: number | string) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </ResponsiveContainer>
  )
}
