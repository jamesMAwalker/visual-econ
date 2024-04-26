/**
 * * useGetCurrentDataSummary *
 * A custom React hook that retrieves the current data summary for a specific stat table (chart).
 *
 * @param data - An array of IBeaApiResponse arrays, representing the data for each stat table.
 * @param currentChartId - The ID of the current stat table being displayed.
 * @returns An object containing the current chart data and its description, or null if the current chart data is not found.
 */

import { useEffect, useState } from 'react'

import { CHART_DESCRIPTIONS, IDataDescription } from '@/data/descriptions'

interface IChartSummaryInfo {
  currentData: IBeaApiResponse[]
  currentDescription: IDataDescription
}

export const useGetCurrentDataSummary = (
  data: IBeaApiResponse[][],
  currentChartId: string | null
) => {
  const [chartSummary, setChartSummary] = useState<IChartSummaryInfo | null>(
    null
  )

  useEffect(() => {
    const currentChart = data.find((set) => set[0].TableName === currentChartId)

    if (!currentChart) {
      return
    }

    const currentChartData = currentChart

    const currentChartDescription =
      CHART_DESCRIPTIONS[currentChartData[0]?.TableName]

    setChartSummary({
      currentData: currentChartData,
      currentDescription: currentChartDescription
    })
  }, [currentChartId, data])

  return chartSummary
}
