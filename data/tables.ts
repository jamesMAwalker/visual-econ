export interface IStatTableItem {
  Year: string;
  TableName: string;
  LineCode: string;
}

export const STAT_TABLES = [
  { Year: 'LAST10', TableName: 'CAINC1', LineCode: '1' },
  { Year: 'LAST10', TableName: 'CAGDP1', LineCode: '1' },
  { Year: 'LAST10', TableName: 'CAINC6N', LineCode: '1' },
  { Year: 'LAST10', TableName: 'CAEMP25N', LineCode: '10' }
]