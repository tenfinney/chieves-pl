import {
  Web3Provider, JsonRpcProvider, StaticJsonRpcProvider,
} from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import type { Maybe } from 'lib/types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Web3Modal from 'web3modal'
import providerOptions from 'lib/walletConnect'
import { NETWORKS } from 'lib/networks'
import contractAddress from 'contracts/BulkDisbersableNFTs.address'
import abi from 'contracts/BulkDisbersableNFTs.abi'

export type Web3ContextType = {
  userProvider?: Web3Provider
  ensProvider?: JsonRpcProvider
  contractProvider?: JsonRpcProvider
  roContract?: Contract
  rwContract?: Contract
  address?: string
  chain?: string
  connect: () => Promise<void>
  disconnect: () => void
  connecting: boolean
  connected: boolean
  isMetaMask: Maybe<boolean>
}

export const Web3Context = (
  createContext<Web3ContextType>({
    connect: async () => {
      throw new Error('Unimplemented')
    },
    disconnect: () => {
      throw new Error('Unimplemented')
    },
    connecting: false,
    connected: false,
    isMetaMask: null,
  })
)

export const useWeb3 = (): Web3ContextType => (
  useContext(Web3Context)
)

export const Web3ContextProvider: React.FC = (
  ({ children }) => {
    const [wallet, setWallet] = useState<Web3Modal>()
    const [userProvider, setUserProvider] = (
      useState<Web3Provider>()
    )
    const [chain, setChain] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [connected, setConnected] = useState(false)

    const web3Modal = useMemo(
      () => {
        if(typeof window !== 'undefined') {
          return (
            new Web3Modal({
              network: 'polygon',
              cacheProvider: true,
              providerOptions,
            })
          )
        }
      },
      [],
    )
    
    const [connecting, setConnecting] = (
      useState(!!web3Modal?.cachedProvider)
    )

    const ensProvider = useMemo(
      () => new StaticJsonRpcProvider(NETWORKS.mainnet.rpc),
      [],
    )

    const contractProvider = useMemo(
      () => (
        new StaticJsonRpcProvider(NETWORKS.contract.rpc)
      ),
      [],
    )

    const roContract = useMemo(
      () => {
        console.debug({ contractAddress, abi, contractProvider })
        return new Contract(contractAddress, abi, contractProvider)
      },
      [contractProvider],
    )

    const rwContract = useMemo(
      () => {
        console.info({ chain })
        if(userProvider && chain) {
          return new Contract(contractAddress, abi, userProvider.getSigner())
        } else {
          return undefined
        }
      },
      [userProvider, chain],
    )

    const disconnect = useCallback(() => {
      web3Modal?.clearCachedProvider()
      // clearWalletConnect()
      setWallet(undefined)
      setAddress(undefined)
      setChain(undefined)
      setUserProvider(undefined)
      setConnecting(false)
      setConnected(false)
    }, [web3Modal])

    const update = useCallback(
      async (vider) => {
        setWallet(vider)

        const web3Provider = new Web3Provider(vider)
        setUserProvider(web3Provider)

        setAddress(await (
          web3Provider.getSigner().getAddress()
        ))

        setChain(vider.chainId)
      },
      [],
    )

    const connect = useCallback(async () => {
      if (web3Modal == null) {
        throw new Error(`Web3Modal is ${web3Modal}`)
      }

      setConnecting(true)

      try {
        const prov = await web3Modal.connect()
        await update(prov)

        prov.on('accountsChanged', () => {
          disconnect()
        })
        prov.on('chainChanged', () => {
          update(prov)
        })
      } catch (error) {
        console.error('`connect` Error', error) // eslint-disable-line no-console
        disconnect()
      } finally {
        setConnecting(false)
      }
    }, [disconnect, update, web3Modal])

    useEffect(() => {
      if (web3Modal?.cachedProvider) {
        connect()
      }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const isMetaMask = useMemo(
      () => (
        typeof window !== 'undefined'
        && window.ethereum?.isMetaMask === true
        && userProvider?.connection?.url === 'metamask'
      ),
      [userProvider],
    )

    return (
      <Web3Context.Provider
        value={{
          userProvider,
          ensProvider,
          contractProvider,
          roContract,
          rwContract,
          connect,
          disconnect,
          connecting,
          connected,
          address,
          chain,
          isMetaMask,
        }}
      >
        {children}
      </Web3Context.Provider>
    )
  }
)
