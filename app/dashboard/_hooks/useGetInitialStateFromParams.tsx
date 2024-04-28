/**
 * * useGetInitialStateFromParams *
 * A custom hook that retrieves the initial state for a component from URL search parameters.
 *
 * The hook extracts the 'states' and 'dates' parameters from the URL and sets the corresponding state in the `chart-params.context`. 
 * It also provides an optional way to set the calling component's state (likely a dropdown) directly using the `componentStateSetter` parameter.
 *
 * @param {IGetInitialStateParams} [options] - An optional object with the following properties:
 * @param {STATE_KEYS} [options.stateKey] - The key to use when setting the component's state.
 * @param {Dispatch<SetStateAction<any>>} [options.componentStateSetter] - A function to set the component's state directly.
 * @returns {void}
 */

'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useChartInputState } from '@/context/chart-params.context'

import { GEOFIPS, IGeoFipsItem } from '@/data'
import {
  IDateDropdownItem,
  QUICK_SELECT_DATES,
  RANGE_SELECT_DATES
} from '@/data/dates'

// TODO: Add other intial params (tables).

export enum STATE_KEYS {
  state = 'STATE',
  date = 'DATE'
}

interface IGetInitialStateParams {
  stateKey?: STATE_KEYS
  componentStateSetter?: Dispatch<SetStateAction<any>>
}

export function useGetInitialStateFromParams({
  stateKey,
  componentStateSetter
}: IGetInitialStateParams = {}) {
  const params = useSearchParams()
  const { setStateParams, setDateParams, stateParams, dateParams } =
    useChartInputState()

  useEffect(() => {
    const dateParams = params.getAll('dates')

    const initialDatesSelection: (IDateDropdownItem | undefined)[] =
      dateParams.length > 0
        ? dateParams.map((param) => {
            const state = [...QUICK_SELECT_DATES, ...RANGE_SELECT_DATES].find(
              (dateItem) => {
                return dateItem.value === param
              }
            )

            if (!state) return

            return state
          })
        : [QUICK_SELECT_DATES[1]]
    setDateParams(initialDatesSelection as IDateDropdownItem[])

    const stateParams = params.getAll('states')
    const initialStatesSelection: (IGeoFipsItem | undefined)[] =
      stateParams.map((param) => {
        const state = GEOFIPS.find((gfItem) => {
          return gfItem.key === param
        })

        if (!state) return

        return state
      })
    setStateParams(initialStatesSelection as IGeoFipsItem[])
  }, [params, setStateParams, setDateParams])

  useEffect(() => {
    if (componentStateSetter && stateKey) {
      const states = {
        [STATE_KEYS.state]: stateParams,
        [STATE_KEYS.date]: dateParams
      }
      componentStateSetter(states[stateKey])
    }
  }, [stateParams, dateParams])
}
