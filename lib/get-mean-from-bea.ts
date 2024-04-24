/**
 * * getMeanFromDataSet
 * Calculates the mean value from a given data set, with optional scaling and number of years.
 *
 * @param dataSet - The data set to calculate the mean from.
 * @param scalingKey - The scaling factor to apply to the data values, can be 'BN', 'M', 'K', or 'NONE'.
 * @returns The mean value of the provided number of data years, formatted with the appropriate scaling abbreviation.
 */

interface IAverageArgs {
  dataSet: IBeaApiResponse
  scalingKey?: 'BN' | 'M' | 'K' | 'NONE'
}

export function getMeanFromBeaData({
  dataSet,
  scalingKey = 'M',
}: IAverageArgs) {
  const scaling: { [key: string]: { factor: number; abbr: string, digits: number } } = {
    BN: {
      factor: 1_000_000_000,
      abbr: 'bn',
      digits: 1
    },
    M: {
      factor: 1_000_000,
      abbr: 'm',
      digits: 1
    },
    K: {
      factor: 1_000,
      abbr: 'k',
      digits: 0
    },
    NONE: {
      factor: 1,
      abbr: '',
      digits: 0

    }
  }

  if (dataSet.Data.length <= 0) return;

  const sum = dataSet?.Data.reduce((acc: number, curr: IBeaDataItem) => {
    return acc + Number(curr.DataValue)
  }, 0)

  const mean = sum / dataSet.Data.length

  const refinedMean = Number((mean / scaling[scalingKey].factor).toFixed(scaling[scalingKey].digits))

  return `${refinedMean}${scaling[scalingKey].abbr}`
}



