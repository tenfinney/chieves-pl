import WalletConnectProvider from '@walletconnect/web3-provider'
import { NETWORKS } from '@/lib/networks'
console.log({NETWORKS})
const rpcUrls = NETWORKS

export const options = {
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     rpc: rpcUrls,
  //   }
  // }
}

export default options