import { toNumList } from '../lib/helpers'

test(
  'can split a list of single numbers', 
  () => {
    expect(toNumList('1,2, 3')).toBe([1, 2, 3])
  }
)
