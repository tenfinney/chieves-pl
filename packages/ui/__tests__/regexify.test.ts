import '@testing-library/jest-dom'
import { regexify } from '@/lib/helpers'

describe('regexify', () => {
  it('shortens a string', () => {
    const str = '0x081010000000000000000000000000000000000000000000000000000010'
    const regex = regexify(str)
    expect(regex).toEqual('0x081010{54}10')
  })
})