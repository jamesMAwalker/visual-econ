/**
 * * getMeanFromBeaData *
 * Calculates a mean value from an array of BEA data items.
 *
 * @param data - An array of `IBeaDataItem` objects containing the data to calculate the mean from.
 * @returns A string representing the mean value, with an appropriate scaling factor (e.g. "1.2k", "4.5m", "2.84bn").
 */

export function getMeanFromBeaData({ data }: { data: IBeaDataItem[] }) {
  if (data.length <= 0) return

  const sum = data.reduce(
    (acc: number, curr: IBeaDataItem) => acc + Number(curr.DataValue),
    0
  )
  const mean = sum / data.length

  const scalingFactors = [
    { factor: 1_000_000_000, abbr: 'bn', digits: 2 },
    { factor: 1_000_000, abbr: 'm', digits: 1 },
    { factor: 1_000, abbr: 'k', digits: 0 },
    { factor: 1, abbr: '', digits: 0 }
  ]

  const { factor, abbr, digits } =
    scalingFactors.find(({ factor }) => mean >= factor) ||
    scalingFactors[scalingFactors.length - 1]

  const refinedMean = Number((mean / factor).toFixed(digits))

  return `${refinedMean}${abbr}`
}
