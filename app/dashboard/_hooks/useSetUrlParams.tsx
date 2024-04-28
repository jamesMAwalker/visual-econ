import { useRouter } from "next/navigation"

import { useChartInputState } from "@/context/chart-params.context"
import { STAT_TABLES } from "@/data"


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

  return { handleSetUrlParams };
}



