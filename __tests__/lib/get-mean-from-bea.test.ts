import { getMeanFromBeaData } from "@/lib/get-mean-from-bea"

const goodTestDataSet = {
  "Statistic": "Total employment",
  "UnitOfMeasure": "Number of jobs",
  "PublicTable": "CAEMP25N Total full-time and part-time employment by NAICS industry",
  "UTCProductionTime": "2024-04-24T14:02:55.250",
  "NoteRef": " ",
  "Dimensions": [
    {
      "Name": "Code",
      "DataType": "string",
      "IsValue": "0"
    }
  ],
  "Data": [
    {
      "Code": "CAEMP25N-10",
      "GeoFips": "05000",
      "GeoName": "Arkansas",
      "TimePeriod": "2022",
      "CL_UNIT": "Number of jobs",
      "UNIT_MULT": "0",
      "DataValue": "1755536"
    },
    {
      "Code": "CAEMP25N-10",
      "GeoFips": "05000",
      "GeoName": "Arkansas",
      "TimePeriod": "2021",
      "CL_UNIT": "Number of jobs",
      "UNIT_MULT": "0",
      "DataValue": "1686444"
    },
  ],
  "Notes": [
    {
      "NoteRef": " ",
      "NoteText": "Metropolitan Areas are defined (geographically delineated) by the Office of Management and Budget (OMB) bulletin no. 20-01 issued March 6, 2020."
    },
  ],
  "StateName": "Arkansas",
  "TableName": "CAEMP25N"
}

const emptyTestDataSet = {
  ...goodTestDataSet,
  Data: []
}

const zeroesTestDataSet = {
  ...goodTestDataSet,
  Data: [{
    "Code": "CAEMP25N-10",
    "GeoFips": "05000",
    "GeoName": "Arkansas",
    "TimePeriod": "2021",
    "CL_UNIT": "Number of jobs",
    "UNIT_MULT": "0",
    "DataValue": "0"
  },]
}


describe('getMeanFromBeaData', () => {

  it('should handle empty dataset', () => {
    const result = getMeanFromBeaData({ dataSet: emptyTestDataSet })
    expect(result).toBeUndefined()
  })

  it('should handle zero values', () => {
    const dataSet = [{ DataValue: '0' }, { DataValue: '0' }]
    const result = getMeanFromBeaData({ dataSet: zeroesTestDataSet })
    expect(result).toBe('0m')
  })

  it('should calculate mean with default values', () => {
    const result = getMeanFromBeaData({ dataSet: goodTestDataSet })
    expect(result).toBe('1.7m')
  })

  it('should calculate mean with scaling', () => {
    const result = getMeanFromBeaData({ dataSet: goodTestDataSet, scalingKey: 'K' })
    expect(result).toBe('1721k')
  })
})
