/**
 * * convertDateRangeToStringList *
 * Converts a date range specified as an array of two numbers (start/end) into a comma-separated string of years.
 * Abstracts the need for this formatting when making requests to the BEA API.
 * 
 * @param dates - An object containing the start and end years as properties.
 * @returns An object with a `years` property containing a comma-separated string of selected years.
 */
import { IBeaSearchParams } from './convert-params-to-request'

export function convertDateRangeToStringList(dates: string[]) {
  const startYear = Number(dates[0])
  const endYear = Number(dates[1])

  const years = Array.from({ length: endYear - startYear }).map((_, idx) => {
    const year = (endYear - idx - 1).toString()

    return year
  })

  const yearsString = years.reduce((acc, curr) => {
    return `${acc},${curr}`
  })

  return { years: yearsString }
}
