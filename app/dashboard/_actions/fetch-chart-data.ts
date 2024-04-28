/**
 * * fetchChartData
 * Fetches chart data from the route handler using search parameters.
 *
 * @param params - The search parameters to use for fetching the chart data.
 * @returns An array of arrays, where each inner array represents the chart 
 * data for all selected states applied to each chart type.
 */

import {
  IBeaSearchParams,
  convertParamsToRequest
} from '@/lib/convert-params-to-request'

interface IAllRequestParams {
  tableName: string
  lineCode: string
  geoFips: string
  dates: string
}

export async function fetchChartData(
  params: IBeaSearchParams
): Promise<(IBeaApiResponse | undefined)[][]> {
  const { stateRequestParams, tableRequestParams, dateRequestParams } =
    convertParamsToRequest(params as IBeaSearchParams)

  const allRequestParams: IAllRequestParams[][] = tableRequestParams.map(
    (table: any) => {
      return stateRequestParams.map((state: any) => {
        const allParams = { ...table, ...state, ...dateRequestParams }

        return allParams
      })
    }
  )

  const results = await Promise.all(
    allRequestParams.map(async (table) => {
      return await Promise.all(
        table.map(async (state) => {
          return fetchData(state)
        })
      )
    })
  )

  return results
}

async function fetchData(
  requestParams: IAllRequestParams
): Promise<IBeaApiResponse | undefined> {
  try {
    const res = await fetch('/api/chart-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestParams)
    })

    const data = await res.json()

    if (data.status !== 200) {
      throw new Error(data.message)
    }

    return {
      ...data.BEAAPI.Results,
      StateName: data.BEAAPI.Results.Data[0].GeoName,
      TableName: requestParams.tableName
    }
  } catch (error: Error | any) {
    throw new Error(error.message)
  }
}
