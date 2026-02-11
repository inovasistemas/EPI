'use client'

import { CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts'

type ChartData = {
  sector: string
  name: string
  cost: number
  expected: number
}

type ChartCostProps = {
  chartData: ChartData[]
}

export function ChartCost({ chartData }: ChartCostProps) {
  const chartConfig = {
    cost: {
      label: 'Recursos',
      color: 'var(--textPrimary)',
    },
    expected: {
      label: 'Esperado',
      color: 'var(--chartYellow)',
    },
  } satisfies ChartConfig

  const dynamicHeight = chartData.length * 60 + 40

  return (
    <CardContent className="p-0 w-full">
      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: `${dynamicHeight}px` }}
      >
        <BarChart
          accessibilityLayer={false}
          data={chartData}
          layout="vertical"
          margin={{
            top: 20,
            right: 80,
            left: 10,
            bottom: 20,
          }}
          barCategoryGap={10}
          barGap={4}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="3 3"
            opacity={0.5}
          />

          <XAxis type="number" hide domain={[0, 'dataMax + 50']} />

          <YAxis dataKey="name" type="category" hide />

          <ChartTooltip
            cursor={false}
            content={({ label, payload }) => {
              if (!payload || !payload.length) return null

              const labels: Record<string, string> = {
                cost: 'Gasto',
                expected: 'Previsto',
              }

              return (
                <div className="bg-background shadow-xl p-3 rounded-lg">
                  <p className="mb-2 font-medium text-sm">{label}</p>

                  <div className="space-y-1">
                    {payload.map((entry, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center gap-4 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-full w-2.5 h-2.5"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="capitalize">
                            {labels[entry.dataKey as string] ?? entry.name}
                          </span>
                        </div>

                        <span className="font-medium">
                          {Number(entry.value).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }}
          />

          <Bar
            dataKey="cost"
            activeBar={false}
            isAnimationActive={false}
            fill="var(--textPrimary)"
            radius={[10, 10, 10, 10]}
            barSize={24}
          >
            <LabelList
              dataKey="name"
              position="insideLeft"
              offset={10}
              className="fill-white font-medium text-sm"
            />
            <LabelList
              dataKey="cost"
              position="right"
              offset={10}
              className="fill-foreground font-medium text-sm"
              formatter={(val: number) =>
                val.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
          </Bar>

          <Bar
            dataKey="expected"
            activeBar={false}
            isAnimationActive={false}
            fill="var(--chartYellow)"
            radius={[10, 10, 10, 10]}
            barSize={10}
          >
            <LabelList
              dataKey="expected"
              position="right"
              offset={10}
              className="fill-muted-foreground font-medium text-xs"
              formatter={(val: number) =>
                val.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  )
}