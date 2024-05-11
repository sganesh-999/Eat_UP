//https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a

import { describe, it, expect } from 'vitest'

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1+1).toEqual(2)
  })
})