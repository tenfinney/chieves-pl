import { create as ipfsHTTPClient } from 'ipfs-http-client'
import { Buffer } from 'buffer'

declare const VITE_INFURA_ID: string
declare const VITE_CHAIN_NAME: string
declare const VITE_IPFS_LINK_PATTERN: string
declare const VITE_IPFS_AUTH_USERNAME: string
declare const VITE_IPFS_AUTH_PASSWORD: string
declare const IPFS_API_HOST: string
declare const IPFS_API_PORT: number
declare const VITE_NFT_GRAPH: string
declare const VITE_NFT_BASE: string

export const infuraId = (
  (
    (typeof VITE_INFURA_ID !== 'undefined') ? (
      VITE_INFURA_ID
    ) : (
      '12345678900987654321'
    )
  )
)

// export const ceramicURL = (
//   process.env.CERAMIC_URL
//   ?? import.meta.env?.CERAMIC_URL
//   ?? 'https://ceramic.metagame.wtf'       // mainnet
//   ?? 'https://ceramic-clay.3boxlabs.com'  // testnet
// )

// export const ceramicNetwork = (
//   process.env.CERAMIC_NETWORK
//   ?? import.meta.env?.CERAMIC_NETWORK
//   ?? 'mainnet' ?? 'testnet-clay'
// )

export const contractNetwork = (
  (
    (typeof VITE_CHAIN_NAME !== 'undefined') ? (
      VITE_CHAIN_NAME
    ) : (
      'polygon'
    )
  )
)

export const ipfsLinkPattern = (
    (
    (typeof VITE_IPFS_LINK_PATTERN !== 'undefined') ? (
      VITE_IPFS_LINK_PATTERN
    ) : (
      'https://{v1cid}.ipfs.dweb.link/{path}'
      ?? 'https://mimis.infura-ipfs.io/ipfs/{cid}/{path}'
    )
  )
)

export const ipfsAuth = {
  username: (
    (typeof VITE_IPFS_AUTH_USERNAME !== 'undefined') ? (
      VITE_IPFS_AUTH_USERNAME
    ) : (
      'username'
    )
  ),
  password: (
    (typeof VITE_IPFS_AUTH_PASSWORD !== 'undefined') ? (
      VITE_IPFS_AUTH_PASSWORD
    ) : (
      'password'
    )
  ),
}

export const Authorization = (
  (ipfsAuth.username && ipfsAuth.password) ? (
    `Basic ${Buffer.from(`${ipfsAuth.username}:${ipfsAuth.password}`).toString('base64')}`
  ) : (
    null
  )
)

const ipfsAPIHost = (
  (
    (typeof IPFS_API_HOST !== 'undefined') ? (
      IPFS_API_HOST
    ) : (
      'ipfs.infura.io'
    )
  )
)

const ipfsAPIPort = (
  (
    (typeof IPFS_API_PORT !== 'undefined') ? (
      IPFS_API_PORT
    ) : (
      5001
    )
  )
)

export const ipfs = ipfsHTTPClient({
  host: ipfsAPIHost,
  port: ipfsAPIPort,
  protocol: 'https',
  headers: Authorization ? { Authorization } : {},
})

export const nftGraph = (
  (
    (typeof VITE_NFT_GRAPH !== 'undefined') ? (
      VITE_NFT_GRAPH
    ) : (
      'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
    )
  )
)

export const nftBase = (
  (
    (typeof VITE_NFT_BASE !== 'undefined') ? (
      VITE_NFT_BASE
    ) : (
      'https://chiev.es/#/view'
    )
  )
)

export const rolePermissions = {
  Superuser: 'Can perform all actions on the token.',
  Minter: 'Can mint new instances of the token.',
  Caster: 'Can assign roles for the token.',
  Transferer: 'Can transfer the token to another account.',
  Configurer: 'Can change the token’s metadata URI.',
  Maintainer: 'Can update the token contract.',
  Creator: 'Can create new token types.',
  Limiter: 'Can set the maximum mintable allowance for a token.',
  Burner: 'Can destroy an instance of a token.',
  Destroyer: 'Can destroy a token type.',
  Oracle: 'Provides information about the off-chain world.',
}

export const defaults = {
  limit: 10,
  offset: 0,
  gating: false,
  visible: '',
}
