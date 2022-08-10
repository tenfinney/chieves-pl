export const IPFS_LINK_PATTERN = (
  process.env.IPFS_LINK_PATTERN ||
  'https://ipfs.io/ipfs/{cid}/{path}' ||
  'https://{v1cid}.ipfs.dweb.link/{path}'
)

export const NFT_HOMEPAGE_BASE = (
  'https://cred.freeweb3.com/view'
)
