/* This function is copied over from the `ui` package
 * because I couldn't get TypeScript to import it
 * correctly. Ideally, this should be shared from
 * `@chievemints/ui/lib/helpers`.
 */
export const deregexify = (str?: string) => {
  if(!str) return str

  const matches = str.split(/(\w\{\d+\})/)
  const expanded = matches.map((m: string) => {
    const [_, char, count] = m.match(/^(.)\{(\d+)\}/) ?? []
    if(char && count) {
      return char.repeat(Number(count))
    } else {
      return m
    }
  })
  return expanded.join('')
}