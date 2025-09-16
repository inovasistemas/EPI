'use client'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  { equipment: 'Equipamentos', withdrawn: 186, notwithdrawn: 50 },
]

const chartConfig = {
  withdrawn: {
    label: 'Regular',
    color: 'var(--textPrimary)',
  },
  notwithdrawn: {
    label: 'Pendente',
    color: 'var(--chartGray)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig

export function SmallChartIssues() {
  return (
    <ResponsiveContainer width='100%' height={60}>
      <CardContent className='p-0 w-full h-full'>
        <ChartContainer
          config={chartConfig}
          className='w-full'
          style={{ height: `${Math.max(chartData.length * 32, 60)}px` }}
        >
          <BarChart
            data={chartData}
            layout='vertical'
            barCategoryGap={2}
            barSize={28}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='equipment'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
              hide
            />
            <XAxis type='number' hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='line'
                  className='shadow-xl border-[--border]'
                  labelKey='equipment'
                  labelFormatter={label => label}
                />
              }
            />

            <Bar
              dataKey='withdrawn'
              stackId='a'
              fill='var(--primaryColor)'
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey='notwithdrawn'
              stackId='a'
              fill='var(--chartGray)'
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </ResponsiveContainer>
  )
}
