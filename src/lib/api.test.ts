import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { fetchCountries, fetchStates } from './api'

const originalEnv = { ...import.meta.env }

describe('api', () => {
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

  it('fetchCountries sorts results alphabetically', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 2, value: 'Zimbabwe' },
        { id: 1, value: 'Albania' },
      ],
    })

    const result = await fetchCountries()
    expect(result.map((c) => c.value)).toEqual(['Albania', 'Zimbabwe'])
  })

  it('fetchCountries throws on non-OK response', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(fetchCountries()).rejects.toThrow('Failed to fetch countries')
  })

  it('fetchStates sorts results alphabetically and includes country id in URL', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 2, value: 'B' },
        { id: 1, value: 'A' },
      ],
    })

    const result = await fetchStates(123)
    expect(result.map((s) => s.value)).toEqual(['A', 'B'])
    const call = (fetch as unknown as vi.Mock).mock.calls[0][0]
    expect(call).toContain('/countries/123/states')
  })

  it('fetchStates throws on non-OK response', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValueOnce({ ok: false, status: 404 })
    await expect(fetchStates(1)).rejects.toThrow('Failed to fetch states')
  })
})


