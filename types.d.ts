  declare interface IBeaDimension {
  "Name": string
  "DataType": string
  "IsValue": string
}

declare interface IBeaDataItem {
  "Code": string
  "GeoFips": string
  "GeoName": string
  "TimePeriod": string
  "CL_UNIT": string
  "UNIT_MULT": string
  "DataValue": string
}

declare interface IBeaNoteItem {
  "NoteRef": string
  "NoteText": string
}

declare interface IBeaApiResponse {
  "Statistic": string
  "UnitOfMeasure": string
  "PublicTable": string
  "UTCProductionTime": string
  "NoteRef": string
  "Dimensions": IBeaDimension[]
  "Data": IBeaDataItem[]
  "Notes": IBeaNoteItem | IBeaNoteItem[]
  "TableName": string
  "StateName": string
}