import ChartJS from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'

import { CHART_COLORS } from '@/data/colors'

ChartJS.register(CategoryScale)

interface ILineChartProps {
  dataSets?: any
  scale?: number
}

export const LineChart = ({ dataSets, scale }: ILineChartProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 5,
          boxHeight: 5,
          color: 'white'
        }
      },
      title: {
        display: true,
        text: dataSets[0]?.Statistic
      }
    }
  }

  const data: ChartData<'line'> = {
    labels: dataSets[0]?.Data?.map((d: any) => d.TimePeriod),
    datasets: dataSets.map((set: any, idx: number) => {
      const lineColor = CHART_COLORS[idx].hex

      return {
        label: set?.StateName,
        data: set?.Data?.sort((a: IBeaDataItem, b: IBeaDataItem) => {
          return Number(a.DataValue) - Number(b.DataValue)
        })?.map((d: any) => Number(d.DataValue) / 1_000_000_000),
        borderColor: lineColor,
        backgroundColor: 'white'
      }
    })
  }

  return <Line options={options} data={data} />
}
