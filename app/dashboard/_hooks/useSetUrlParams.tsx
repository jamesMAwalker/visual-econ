/**
 * * useSetUrlParams *
 * A custom hook that generates URL search params from user inputs.
 *
 * The hook gets the user's desired search params from context, and builds a URL string. It then uses the push method to take the user to the dashboard page with 
 * their search paramters carried into the next page via the URL.
 * 
 * We also call the refresh method, as push does not reset the page state by default. Calling refresh allows us to display new chart data whenever users update the 
 * toolbar inputs.
 */

import { useRouter } from 'next/navigation'

import { useChartInputState } from '@/context/chart-params.context'
import { STAT_TABLES } from '@/data'

export function useSetUrlParams() {
  const router = useRouter()

  const { stateParams, dateParams } = useChartInputState()
  
  function handleSetUrlParams() {
    const urlDateParams = dateParams
      .map((date) => `${date.value}`)
      .join('&dates=')
    const urlTableParams = STAT_TABLES.map(
      (table) => `${table.TableName}_${table.LineCode}`
    ).join('&tables=')
    const urlStateParams = stateParams
      .map((item) => `${item.key}`)
      .join('&states=')
    const url = `/dashboard?states=${urlStateParams}&tables=${urlTableParams}&dates=${urlDateParams}`

    router.push(url)
    router.refresh()
  }

  return { handleSetUrlParams }
}
