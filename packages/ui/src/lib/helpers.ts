import {
  CodedError, FileListish, Limits, Maybe, MetaMaskError, NamedString, NestedError
} from '@/lib/types'
import { CID } from 'multiformats/cid'
import { IPFS_LINK_PATTERN } from '@/lib/constants'
import { NETWORKS } from '@/lib/networks'
import CONFIG from '@/config'
import all from 'it-all'

export const httpURL = (uri?: Maybe<string>) => {
  const [, origCID, path] = (
    uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? []
  )

  if(origCID) {
    const cid = CID.parse(origCID)
    const v0CID = cid.toV0().toString()
    const v1CID = cid.toV1().toString()
    const pattern = IPFS_LINK_PATTERN
    return (
      encodeURI(
        pattern
        .replace(/{cid}/g, origCID)
        .replace(/{v0cid}/g, v0CID)
        .replace(/{v1cid}/g, v1CID)
        .replace(/{path}/g, path ?? '')
      )
      .replace(/#/g, '%23')
    )
  }

  return uri
}

export const capitalize = (str: string) => {
  if(!str?.split) return str
  return (
    str.trim().split(/\s+/g)
    .map((sub) => (`${
      sub[0]?.toUpperCase() ?? ''
    }${
      sub.substring(1)?.toLowerCase() ?? ''
    }`))
    .join(' ')
  )
}

export const isEmpty = (
  (val: unknown) => {
    if(Array.isArray(val)) {
      return val.length === 0
    }
    if(val instanceof Object) {
      return Object.keys(val).length === 0
    }
    if(val === '') {
      return true
    }
    return false
  }
)

export const isSet = (
  (val: unknown) => {
    if(val === '' || val == null) {
      return false
    }
    return true
  }
)

export const switchTo = async (chain: string) => {
  try {
    await window.ethereum.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain }],
    })
  } catch (switchError) {
    if ((switchError as CodedError).code === 4902) {
      throw new Error(
        `The network “${NETWORKS[chain].name ?? 'Unknown'}”`
        + ' is not yet available in your MetaMask.\n\n'
        + ' Please add it.'
      )
    } else {
      throw switchError
    }
  }
}

export const ipfsify = async (filesOrURL: FileListish) => {
  let value = filesOrURL
  if (Array.isArray(value) && typeof value[0] === 'string') {
    const count = value.length
    if (count !== 1) {
      throw new Error(
        `Unexpected ${count} entries in string array`
        + ' passed to ipfsify.'
      )
    }
    value = value[0]
  }

  if (typeof value === 'string') {
    if (value.startsWith('ipfs://')) {
      return [value]
    }
    throw new Error(`Unknown File String: ${value}`)
  }

  const list: Array<File | NamedString> = (
    Array.isArray(value) ? (
      value as Array<File | NamedString>
    ) : (
      [value as File | NamedString]
    )
  )

  const result = await all(CONFIG.ipfs.addAll(
    list.map((entry) => ({
      path: entry.name,
      content: (entry as NamedString).content ?? entry 
    })) as Array<{ path: string; content: string }>,
    { pin: true, wrapWithDirectory: true }
  ))
  const [{ cid }] = result.slice(-1) as unknown as [{ cid: CID }]
  const out = list.map((entry) => (
    `ipfs://${cid.toString()}/`
    + (entry as File).name
  ))
  return out
}

export const regexify = (str?: string) => {
  if(!str) return str

  let matches = str.split(/((\w)\2{3,})/g)
  for(let i = 0; i < matches.length - 1; i++) {
    const str = matches[i]
    const next = matches[i + 1]
    if((new Set([...str, ...next])).size === 1) {
      matches[i] += next
      matches[i + 1] = ''
      i++
    }
  }
  matches = matches.filter((m) => m !== '')
  const condensed = matches.map((m: string) => {
    const [char] = m
    if(
      m.length > 3
      && /\w/.test(char)
      && (new Set(m)).size === 1
    ) {
      return `${char}{${m.length - 1}}`
    } else {
      return m
    }
  })

  return condensed.join('')
}

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

export const extractMessage = (error: unknown): string => (
  (
    (error as NestedError)?.error?.message
    ?? (error as MetaMaskError)?.data?.message
    ?? (error as Error)?.message
    ?? error
  ) as string
)

export const toNumList = (str: string): Array<number | Limits> => {
  if(str == null) return []

  const visibles = (
    str.split(/\s*(\s|,)\s*/)
    .filter((str) => !['', ','].includes(str.trim()))
  )
  return (
    visibles.map((entry) => {
      const parts = entry.split(/-/)
      if(parts.length > 1) {
        const [[low], [high]] = (
          [parts, parts.slice(-1)]
        )
        console.info({ parts, low, high })
        return Object.fromEntries(
          Object.entries({ low, high }).map(
            ([key, val]) => [key, Number(val)]
          )
        )
      }
      return Number(entry)
    })
  )
}
