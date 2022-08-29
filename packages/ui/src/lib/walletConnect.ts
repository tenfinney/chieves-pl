import WalletConnectProvider from '@walletconnect/web3-provider'
import { NETWORKS } from '@/lib/networks'
import { infuraId } from '@/config'

const rpcUrls = NETWORKS

export const options = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: rpcUrls,
      // infuraId,
    }
  }
}

export default options