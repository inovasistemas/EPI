'use client'
import { CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

type SmallChartIssuesProps = {
  equipment: string
  withdrawn: number
  not_withdrawn: number
}

export const description = 'A bar chart with a custom label'

const chartConfig = {
  withdrawn: {
    label: 'Regular',
    color: 'var(--textPrimary)',
  },
  not_withdrawn: {
    label: 'Pendente',
    color: 'var(--chartGray)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig

export function SmallChartIssues({
  equipment,
  withdrawn,
  not_withdrawn,
}: SmallChartIssuesProps) {
  const chartData = [{ equipment, withdrawn, not_withdrawn }]
  const radius: [number, number, number, number] = not_withdrawn > 0 ? [4, 0, 0, 4] : [4, 4, 4, 4]

  if (withdrawn == 0 && not_withdrawn == 0) {
    return (
      <div className='flex items-center w-full h-[60px]'>
        <div className='bg-[--textPrimary] rounded w-full h-7'></div>
      </div>
    )
  }

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
            <XAxis type='number' domain={[0, withdrawn + not_withdrawn]} hide />
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
              style={{ height: `${Math.max(chartData.length * 32, 60)}px` }}
              radius={radius}
            />
            <Bar
              dataKey='not_withdrawn'
              stackId='a'
              fill='var(--chartYellow)'
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </ResponsiveContainer>
  )
}
