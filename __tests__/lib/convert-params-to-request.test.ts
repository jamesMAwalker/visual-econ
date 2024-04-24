import {
  convertParamsToRequest,
  IBeaSearchParams,
  IBeaRequestParams
} from '@/lib/convert-params-to-request'

describe('convertParamsToRequest', () => {
  it('should throw error if states or tables params are missing', () => {
    const searchParams: IBeaSearchParams = {}

    expect(() => convertParamsToRequest(searchParams)).toThrowError(
      'States and tables params are required'
    )
  })

  // STATE CASES
  it('should convert string state param to array of objects', () => {
    const searchParams: IBeaSearchParams = {
      states: '010000',
      tables: 'table1_1'
    }

    const expected: IBeaRequestParams = {
      stateRequestParams: [{ geoFips: '010000' }],
      tableRequestParams: [{ tableName: 'table1', lineCode: '1' }]
    }

    expect(convertParamsToRequest(searchParams)).toEqual(expected)
  })
  it('should convert array state param to array of objects', () => {
    const searchParams: IBeaSearchParams = {
      states: ['01', '02'],
      tables: 'table1_line1'
    }

    const expected: IBeaRequestParams = {
      stateRequestParams: [{ geoFips: '01' }, { geoFips: '02' }],
      tableRequestParams: [{ tableName: 'table1', lineCode: 'line1' }]
    }

    expect(convertParamsToRequest(searchParams)).toEqual(expected)
  })

  // TABLE CASES
  it('should convert string table param to array of objects', () => {
    const searchParams: IBeaSearchParams = {
      states: '01',
      tables: 'table1_line1'
    }

    const expected: IBeaRequestParams = {
      stateRequestParams: [{ geoFips: '01' }],
      tableRequestParams: [{ tableName: 'table1', lineCode: 'line1' }]
    }

    expect(convertParamsToRequest(searchParams)).toEqual(expected)
  })
  it('should convert array table param to array of objects', () => {
    const searchParams: IBeaSearchParams = {
      states: '01',
      tables: ['table1_line1', 'table2_line2']
    }

    const expected: IBeaRequestParams = {
      stateRequestParams: [{ geoFips: '01' }],
      tableRequestParams: [
        { tableName: 'table1', lineCode: 'line1' },
        { tableName: 'table2', lineCode: 'line2' }
      ]
    }

    expect(convertParamsToRequest(searchParams)).toEqual(expected)
  })
})
