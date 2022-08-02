import { create as ipfsHTTPClient } from 'ipfs-http-client'

export const CONFIG = {
  infuraId: (
    process.env.NEXT_PUBLIC_INFURA_ID
    ?? '781d8466252d47508e177b8637b1c2fd'
  ),
  ceramicURL: (
    process.env.NEXT_PUBLIC_CERAMIC_URL
    ?? 'https://ceramic.metagame.wtf'       // mainnet
    ?? 'https://ceramic-clay.3boxlabs.com'  // testnet
  ),
  ceramicNetwork: (
    process.env.NEXT_PUBLIC_CERAMIC_NETWORK
    ?? 'mainnet' ?? 'testnet-clay'
  ),
  contractNetwork: (
    process.env.NEXT_PUBLIC_CHAIN_NAME || 'polygon'
  ),
  ipfs: ipfsHTTPClient({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https'
  }),  
  nftGraph: (
    process.env.NEXT_PUBLIC_NFT_GRAPH
    ?? 'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
  ),
  rolePermissions: {
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
}

export default CONFIG