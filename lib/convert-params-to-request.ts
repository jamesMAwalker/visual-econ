export function convertParamsToRequest(
  searchParams: Record<string, string | string[]>
) {
  const { states, tables } = searchParams

  const stateRequestParams = Array.isArray(states)
    ? states.map((state: any) => ({
      geoFips: state
    }))
    : [{ geoFips: states }]

  const tableRequestParams = Array.isArray(tables)
    ? tables.map((table: any) => {
      const [tableName, lineCode] = table.split('_')

      return { tableName, lineCode }
    })
    : (() => {
      const [tableName, lineCode] = tables.split('_')

      return { tableName, lineCode }
    })()

  return { stateRequestParams, tableRequestParams }
}