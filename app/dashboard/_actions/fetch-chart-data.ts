export async function fetchChartData(params: any) {
  const { stateRequestParams, tableRequestParams } = params

  try {
    const tableAndStateParams = tableRequestParams.map((table: any) => {
      return stateRequestParams.map((state: any) => {
        return { ...table, ...state }
      })
    })

    const results = await Promise.all(tableAndStateParams.map(async (table: any) => {
      return await Promise.all(table.map(async (state: any) => {
        const { tableName, lineCode, geoFips }  = state;

        const res = await fetch('/api/chart-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            geoFips,
            tableName,
            lineCode
          })
        })

        const data = await res.json()

        if (data.status !== 200) {
          throw new Error(data.message)
        }

        return data;
      }))
    }))

    console.log("🚀 ~ fetchChartData ~ results:", results)
    return results;
  } catch (error) {
    console.log("🚀 ~ fetchChartData ~ error:", error)
    throw error;
  }
}