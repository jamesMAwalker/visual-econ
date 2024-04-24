'use client'

import { IGeoFipsItem, IStatTableItem } from '@/data'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

const ChartDataInputState = createContext<{
  stateParams: IGeoFipsItem[]
  setStateParams: (arg: IGeoFipsItem[]) => void
  tableParams: IStatTableItem[]
  setTableParams: (arg: IStatTableItem[]) => void
  dateParams: any[]
  setDateParams: (arg: any[]) => void
} | null>(null)

export const useChartInputState = () => {
  const context = useContext(ChartDataInputState)
  if (!context) {
    throw new Error(
      'useChartInputState must be used within a ChartDataProvider'
    )
  }

  return context
}

export const ChartDataProvider = ({ children }: { children: ReactNode }) => {
  const [stateParams, setStateParams] = useState<IGeoFipsItem[]>([])
  const [tableParams, setTableParams] = useState<IStatTableItem[]>([])
  const [dateParams, setDateParams] = useState<any[]>([])

  const chartContextValue = useMemo(
    () => ({
      stateParams,
      setStateParams,
      tableParams,
      setTableParams,
      dateParams,
      setDateParams
    }),
    [stateParams, tableParams, dateParams]
  )

  return (
    <ChartDataInputState.Provider value={{ ...chartContextValue }}>
      {children}
    </ChartDataInputState.Provider>
  )
}
