'use client'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
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

export const description = 'A multiple bar chart'

const chartData = [
  { month: 'Manutenção Máquinas', sector: 186, subsector: 80 },
  { month: 'Operação Máquinas', sector: 305, subsector: 200 },
  { month: 'Logística Interna', sector: 237, subsector: 120 },
  { month: 'Almoxarifado', sector: 237, subsector: 120 },
  { month: 'Laboratório', sector: 237, subsector: 120 },
  { month: 'Limpeza Industrial', sector: 237, subsector: 120 },
  { month: 'Soldagem', sector: 237, subsector: 120 },
  { month: 'Manutenção Máquinas 1', sector: 186, subsector: 80 },
  { month: 'Operação Máquinas 2', sector: 305, subsector: 200 },
  { month: 'Logística Interna 3', sector: 237, subsector: 120 },
  { month: 'Almoxarifado 4', sector: 237, subsector: 120 },
  { month: 'Laboratório 5', sector: 237, subsector: 120 },
  { month: 'Limpeza Industrial 6', sector: 237, subsector: 120 },
  { month: 'Soldagem 7', sector: 237, subsector: 120 },
]

const chartConfig = {
  sector: {
    label: 'Setor',
    color: 'var(--primaryColor)',
  },
  subsector: {
    label: 'Subsetores',
    color: 'var(--secondaryColor)',
  },
} satisfies ChartConfig

export function ChartCost() {
  return (
    <Card className='bg-transparent shadow-none border-none w-full h-full'>
      <CardContent className='w-full h-full'>
        <ChartContainer config={chartConfig} className='w-full'>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              right: 16,
            }}
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
            <XAxis dataKey='sector' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator='line' className='border-none' />
              }
            />
            <Bar
              dataKey='sector'
              layout='vertical'
              fill='var(--color-sector)'
              radius={4}
              className='transition-all duration-300'
            >
              <LabelList
                dataKey='month'
                position='insideLeft'
                offset={8}
                className='fill-white font-medium'
                fontSize={12}
              />
              <LabelList
                dataKey='sector'
                position='right'
                offset={8}
                className='fill-foreground'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
