import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CountryStateDropdowns } from './country-state-dropdowns'

// Mock use-toast to avoid rendering Radix toasts in tests
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}))

// Mock our UI Select components with simple test-friendly primitives
vi.mock('@/components/ui/select', () => {
  const React = require('react') as typeof import('react')
  const Select = ({ value, onValueChange, children }: any) => (
    <div data-testid="select" data-value={value}>
      {React.Children.map(children, (child: any) =>
        React.isValidElement(child) ? React.cloneElement(child, { onValueChange }) : child
      )}
    </div>
  )
  const SelectTrigger = ({ children, ...props }: any) => <button {...props}>{children}</button>
  const SelectContent = ({ children }: any) => <div>{children}</div>
  const SelectItem = ({ value, children, onValueChange, ...props }: any) => (
    <button {...props} onClick={() => onValueChange?.(value)}>
      {children}
    </button>
  )
  const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>
  return { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
})

const originalEnv = { ...import.meta.env }

describe('CountryStateDropdowns', () => {
  beforeEach(() => {
    ;(globalThis as any).fetch = vi.fn()
    ;(import.meta as any).env = {
      ...originalEnv,
      VITE_API_BASE_URL: 'https://example.com/api/v1',
    }
  })

  afterEach(() => {
    ;(globalThis as any).fetch = undefined
    ;(import.meta as any).env = originalEnv
    vi.restoreAllMocks()
  })

  it('loads countries on mount and populates the country dropdown', async () => {
    ;(fetch as unknown as vi.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
      ] })

    render(<CountryStateDropdowns />)

    await waitFor(() => {
      expect(screen.getByText('A')).toBeInTheDocument()
      expect(screen.getByText('B')).toBeInTheDocument()
    })
  })

  it('loads states after selecting a country and enables submit', async () => {
    ;(fetch as unknown as vi.Mock)
      // countries
      .mockResolvedValueOnce({ ok: true, json: async () => [
        { id: 1, value: 'A' },
      ] })
      // states for country 1
      .mockResolvedValueOnce({ ok: true, json: async () => [
        { id: 10, value: 'X' },
        { id: 11, value: 'Y' },
      ] })

    render(<CountryStateDropdowns />)

    // Pick country 'A'
    await userEvent.click(await screen.findByText('A'))

    // Pick state 'X'
    await userEvent.click(await screen.findByText('X'))

    // Submit should now be enabled
    const submit = screen.getByRole('button', { name: /Submit Selection/i })
    expect(submit).toBeEnabled()
  })
})


