'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react'

import { IDateDropdownItem, QUICK_SELECT_DATES } from '@/data/dates'
import { IGeoFipsItem, IStatTableItem } from '@/data'


const ChartDataInputState = createContext<{
  stateParams: IGeoFipsItem[]
  setStateParams: (arg: IGeoFipsItem[]) => void
  tableParams: IStatTableItem[]
  setTableParams: (arg: IStatTableItem[]) => void
  dateParams: any[]
  setDateParams: (arg: any[]) => void
  currentChartId: string | null
  setCurrentChartId: (arg: string) => void
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
  const [dateParams, setDateParams] = useState<IDateDropdownItem[]>([
    QUICK_SELECT_DATES[1]
  ])
  const [currentChartId, setCurrentChartId] = useState<string | null>(null)

  const chartContextValue = useMemo(
    () => ({
      stateParams,
      setStateParams,
      tableParams,
      setTableParams,
      dateParams,
      setDateParams,
      currentChartId,
      setCurrentChartId
    }),
    [stateParams, tableParams, dateParams, currentChartId]
  )

  return (
    <ChartDataInputState.Provider value={{ ...chartContextValue }}>
      {children}
    </ChartDataInputState.Provider>
  )
}
