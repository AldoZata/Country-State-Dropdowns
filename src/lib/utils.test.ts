import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts', () => {
    const result = cn('p-2', 'text-sm', 'p-4', false && 'hidden', undefined)
    expect(result).toBe('text-sm p-4')
  })

  it('handles conditional and nullish values', () => {
    const condition = false
    const result = cn('block', condition && 'hidden', null as unknown as string)
    expect(result).toBe('block')
  })
})


