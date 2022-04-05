export type Maybe<T> = T | null
export type Values<T> = T[keyof T]
export type Optional<T> = T | undefined

export type Attribute = {
  trait_type?: string
  value?: string | number
  display_type?: string
}
export type ERC1155Metadata = {
  name?: string
  description?: string
  decimals?: number
  attributes?: Array<Attribute>
  properties?: { wearables?: Record<string, string> }
  external_url?: string
  image?: string
  animation_url?: string
  background_color?: string

} & {
  [key: string]: string | number
}

export type CodedError = Error & { code: number }

export type TokenState = {
  id: string
  uri?: string
  metadata?: ERC1155Metadata
  total?: number
  error?: string
}
