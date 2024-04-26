export interface IDateDropdownItem {
  value: string
  display: string
}

export const QUICK_SELECT_DATES: IDateDropdownItem[] = [
  {
    value: 'LAST5',
    display: 'Last 5 Years'
  },
  {
    value: 'LAST10',
    display: 'Last 10 Years'
  },
  {
    value: 'ALL',
    display: 'All Years'
  },
]

export const RANGE_SELECT_DATES: IDateDropdownItem[] = getAvailableYears()

function getAvailableYears(): IDateDropdownItem[] {
  const currentYear = new Date().getFullYear()

  const allYears = Array.from({ length: currentYear - 1929 }).map((_, idx) => {
    const year = (currentYear - idx - 1).toString()
    return { value: year, display: year }
  })

  return allYears;
}