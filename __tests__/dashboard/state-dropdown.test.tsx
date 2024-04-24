import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { ChartDataProvider } from '@/context/chart-params.context'
import { StateDropdown } from '@/components/inputs/state-dropdown'

const dropdownItems = [
  { key: '01000', name: 'Alabama', code: 'AL' },
  { key: '02000', name: 'Alaska', code: 'AK' }
]

function renderComponentWithMockContext() {
  render(
    <ChartDataProvider>
      <StateDropdown list={dropdownItems} />
    </ChartDataProvider>
  )
}

describe('StateDropdown', () => {
  it('should render text "select state" when no items are selected', () => {
    renderComponentWithMockContext()

    expect(screen.getByText(/select state/i)).toBeInTheDocument()
  })
  it('should render a state abbreviation when a state is selected', async () => {
    renderComponentWithMockContext()

    const user = userEvent.setup()
    const dropdownButton = screen.getByRole('combobox')

    await user.click(dropdownButton)

    const stateItem = screen.getByText('Alabama')

    await user.click(stateItem)

    expect(screen.getByText('AL')).toBeInTheDocument()
  })
  it('should render a list of dropdown items when clicked', async () => {
    renderComponentWithMockContext()

    const user = userEvent.setup()
    const dropdownButton = screen.getByRole('combobox')

    await user.click(dropdownButton)

    dropdownItems.forEach((item: any) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
    })
  })
})
