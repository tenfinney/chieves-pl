import WalletConnectProvider from '@walletconnect/web3-provider'
import { NETWORKS } from '@/lib/networks'

const rpcUrls = Object.fromEntries(
  Object.values(NETWORKS).map(
    ({ chainId, rpc }) => [Number(chainId), rpc]
  )
)

export const options = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: rpcUrls,
    }
  }
}

export default options