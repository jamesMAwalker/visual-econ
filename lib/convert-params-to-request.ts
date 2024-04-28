/**
 * * convertParamsToRequest *
 * Converts search parameters to request parameters for the BEA API.
 *
 * @param searchParams - An object containing the search parameters, including states, tables, and dates.
 * @returns An object containing the request parameters, including state request params, table request params, and date request params.
 * @throws Error if the state, table, or date parameters are missing.
 */

import { convertDateRangeToStringList } from "./convert-date-range-to-string-list";

export interface IBeaSearchParams {
  [key: string]: string | string[] | undefined
}

export interface IBeaRequestParams {
  stateRequestParams: { geoFips: string }[]
  tableRequestParams: { tableName: string; lineCode: string }[]
  dateRequestParams: { years: string }
}

export function convertParamsToRequest(
  searchParams: IBeaSearchParams
): IBeaRequestParams {
  const { states, tables, dates } = searchParams

  if (!states || !tables || !dates)
    throw new Error('State, table, and date params are required.')

  const dateRequestParams = Array.isArray(dates)
    ? convertDateRangeToStringList(dates)
    : { years: dates }
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

  return { stateRequestParams, tableRequestParams, dateRequestParams }
}
