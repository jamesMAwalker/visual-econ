'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useChartInputState } from '@/context/chart-params.context'

import { GEOFIPS, IGeoFipsItem } from '@/data'
import { IDateDropdownItem, QUICK_SELECT_DATES, RANGE_SELECT_DATES } from '@/data/dates'

// TODO: Add other intial params (tables).

export function useGetInitialStateFromParams() {
  const params = useSearchParams()
  const { setStateParams, setDateParams } = useChartInputState()

  useEffect(() => {
    const dateParams = params.getAll('dates')
    const initialDatesSelection: (IDateDropdownItem | undefined)[] =
      dateParams.map((param) => {
        const state = [...QUICK_SELECT_DATES, ...RANGE_SELECT_DATES].find((dateItem) => {
          return dateItem.value === param
        })

        if (!state) throw new Error('Invalid search paramters!')

        return state
      })
    setDateParams(initialDatesSelection as IDateDropdownItem[])

    const stateParams = params.getAll('states')
    const initialStatesSelection: (IGeoFipsItem | undefined)[] =
      stateParams.map((param) => {
        const state = GEOFIPS.find((gfItem) => {
          return gfItem.key === param
        })

        if (!state) throw new Error('Invalid search paramters!')

        return state
      })
    setStateParams(initialStatesSelection as IGeoFipsItem[])
  }, [params, setStateParams, setDateParams])
}
