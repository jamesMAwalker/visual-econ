import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { Toolbar } from '@/components/layout/toolbar'

const { usePathnameMock } = vi.hoisted(() => {
  return { usePathnameMock: vi.fn() }
})

vi.mock('next/navigation', () => {
  return {
    usePathname: usePathnameMock
  }
})

describe('Toolbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render only the logo if on the home page', () => {
    usePathnameMock.mockReturnValue('/')
    render(<Toolbar />)

    expect(
      screen.getByRole('heading', { name: /visual economy/i })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
  it('should render the submit button if on dashboard page', async () => {
    usePathnameMock.mockReturnValue('/dashboard')
    render(<Toolbar />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
