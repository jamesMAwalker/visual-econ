import { IBeaRequestParams } from "@/lib/convert-params-to-request"

interface ITableAndStateParams {
  tableName: string;
  lineCode: string;
  geoFips: string;
}

export async function fetchChartData(params: IBeaRequestParams): Promise<(IBeaApiResponse | undefined)[][]> {
  const { stateRequestParams, tableRequestParams } = params

  const tableAndStateParams: ITableAndStateParams[][] = tableRequestParams.map((table: any) => {
    return stateRequestParams.map((state: any) => {
      return { ...table, ...state }
    })
  })

  const results = await Promise.all(tableAndStateParams.map(async (table) => {
    return await Promise.all(table.map(async (state) => {
      return fetchData(state)
    }))
  }))

  return results;
}

async function fetchData(requestParams: ITableAndStateParams): Promise<IBeaApiResponse | undefined> {
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