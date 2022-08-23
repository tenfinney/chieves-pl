import { create as ipfsHTTPClient } from 'ipfs-http-client'
import { Buffer } from 'buffer'

export const infuraId = (
  process.env.VITE_INFURA_ID
  ?? import.meta.env ? (
    import.meta.env.VITE_INFURA_ID
  ) : (
    '12345678900987654321'
  )
)

export const ceramicURL = (
  process.env.CERAMIC_URL
  ?? import.meta.env?.CERAMIC_URL
  ?? 'https://ceramic.metagame.wtf'       // mainnet
  ?? 'https://ceramic-clay.3boxlabs.com'  // testnet
)

export const ceramicNetwork = (
  process.env.CERAMIC_NETWORK
  ?? import.meta.env?.CERAMIC_NETWORK
  ?? 'mainnet' ?? 'testnet-clay'
)

export const contractNetwork = (
  process.env.VITE_CHAIN_NAME
  ?? import.meta.env?.VITE_CHAIN_NAME
  ?? 'polygon'
)

export const ipfsLinkPattern = (
  process.env.VITE_IPFS_LINK_PATTERN
  ?? import.meta.env ? (
    import.meta.env.VITE_IPFS_LINK_PATTERN
  ) : (
    'https://{v1cid}.ipfs.dweb.link/{path}'
    ?? 'https://mimis.infura-ipfs.io/ipfs/{cid}/{path}'
  )
)

export const ipfsAuth = {
  username: (
    process.env.VITE_IPFS_AUTH_USERNAME
    ?? import.meta.env ? (
      import.meta.env.VITE_IPFS_AUTH_USERNAME
    ) : (
      'username'
    )
  ),
  password: (
    process.env.VITE_IPFS_AUTH_PASSWORD
    ?? import.meta.env ? (
      import.meta.env.VITE_IPFS_AUTH_PASSWORD
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
  process.env.IPFS_API_HOST
  ?? import.meta.env?.IPFS_API_HOST
  ?? 'ipfs.infura.io'
)

const ipfsAPIPort = (
  process.env.IPFS_API_PORT
  ?? import.meta.env?.IPFS_API_PORT
  ?? 5001
)

export const ipfs = ipfsHTTPClient({
  host: ipfsAPIHost,
  port: ipfsAPIPort,
  protocol: 'https',
  headers: Authorization ? { Authorization } : {},
})

export const nftGraph = (
  process.env.NFT_GRAPH
  ?? 'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
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

export const nftHomepageBase = (
  process.env.NFT_HOMEPAGE_BASE
  ?? 'https://chiev.es/#/view'
)

export const defaults = {
  limit: 10,
  offset: 0,
  gating: false,
  visible: '',
}