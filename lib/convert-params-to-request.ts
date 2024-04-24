export interface IBeaSearchParams { [key: string]: string | string[] | undefined }

export interface IBeaRequestParams {
  stateRequestParams: { geoFips: string }[];
  tableRequestParams: { tableName: string; lineCode: string }[]
}


export function convertParamsToRequest(
  searchParams: IBeaSearchParams
): IBeaRequestParams {
  const { states, tables } = searchParams

  if (!states || !tables) throw new Error('States and tables params are required')

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

      return [{ tableName, lineCode }]
    })()

  return { stateRequestParams, tableRequestParams }
}