import {
  ExternalProvider, Web3Provider, JsonRpcProvider, StaticJsonRpcProvider,
} from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import type { Maybe } from '@/lib/types'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import providerOptions from '@/lib/walletConnect'
import { NETWORKS } from '@/lib/networks'
import { contractNetwork } from '@/config'

export type Web3ContextType = {
  userProvider?: Web3Provider
  ensProvider?: JsonRpcProvider
  contractProvider?: JsonRpcProvider
  roContract?: Contract
  constsContract?: Contract
  rwContract?: Contract
  address?: string
  chain?: number
  connect: () => Promise<void>
  disconnect: () => void
  connecting: boolean
  connected: boolean
  contract: {
    address: Maybe<string>
    abi: Maybe<Record<string, unknown>>
  }
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
    contract: {
      address: null,
      abi: null,
    },
  })
)

export const useWeb3 = (): Web3ContextType => (
  useContext(Web3Context)
)

export const Web3ContextProvider: React.FC<{ children: ReactNode }> = (
  ({ children }) => {
    const [web3Modal, setWeb3Modal] = (
      useState(null)
    )
    const [userProvider, setUserProvider] = (
      useState<Web3Provider>()
    )
    const [chain, setChain] = useState<number>()
    const [address, setAddress] = useState<string>()
    const [connected, setConnected] = useState(false)
    const [contractAddress, setContractAddress] = useState(null)
    const [abi, setABI] = useState(null)
    const [constsContractAddress, setConstsContractAddress] = useState(null)
    const [constsABI, setConstsABI] = useState(null)

    useEffect(() => {
      const lib = async () => {
        if(typeof window !== 'undefined') {
          const { default: Web3Modal } = await import('web3modal')
          setWeb3Modal(new Web3Modal({
            network: (
              contractNetwork === 'polygon'
              ? 'matic' : contractNetwork
            ),
            cacheProvider: true,
            providerOptions,
          }))
        }
      }
      
      lib()
    }, [])

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
        if(contractAddress && abi) {
          return (
            new Contract(contractAddress, abi, contractProvider)
          )
        }
      },
      [contractProvider, abi, contractAddress],
    )
    const constsContract = useMemo(
      () => {
        if(constsContractAddress && constsABI) {
          return (
            new Contract(constsContractAddress, constsABI, contractProvider)
          )
        }
      },
      [contractProvider, constsABI, constsContractAddress],
    )

    const rwContract = useMemo(
      () => {
        if(
          contractAddress
          && abi
          && userProvider
          && Number(chain) === NETWORKS.contract.chainId
        ) {
          return new Contract(contractAddress, abi, userProvider.getSigner())
        } else {
          return undefined
        }
      },
      [userProvider, chain, abi, contractAddress],
    )

    const disconnect = useCallback(() => {
      web3Modal?.clearCachedProvider()
      // clearWalletConnect()
      setAddress(undefined)
      setChain(undefined)
      setUserProvider(undefined)
      setConnecting(false)
      setConnected(false)
      setContractAddress(null)
      setABI(null)
    }, [web3Modal])

    const update = useCallback(
      async (vider: ExternalProvider) => {
        const web3Provider = new Web3Provider(vider)
        setUserProvider(web3Provider)

        setAddress(await (
          web3Provider.getSigner().getAddress()
        ))

        setChain((vider as { chainId: number }).chainId)
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

    useEffect(() => {
      const libs = async () => {
        const chain = contractNetwork
        if(!contractAddress) {
          import(
            `../contracts/${chain}/BulkDisbursableNFTs.address.ts`
          )
          .then(({ default: addr }) => setContractAddress(addr))
        }
        if(!abi) {
          import (
            `../contracts/${chain}/BulkDisbursableNFTs.abi.ts`
          )
          .then(({ default: abi }) => setABI(abi))
        }
      }

      libs()
    }, [userProvider])

    useEffect(() => {
      const libs = async () => {
        const chain = contractNetwork
        import(
          `../contracts/${chain}/Bits.address.ts`
        )
        .then(({ default: addr }) => setConstsContractAddress(addr))

        import (
          `../contracts/${chain}/Bits.abi.ts`
        )
        .then(({ default: abi }) => setConstsABI(abi))
      }

      libs()
    }, [])

    return (
      <Web3Context.Provider
        value={{
          userProvider,
          ensProvider,
          contractProvider,
          roContract,
          constsContract,
          rwContract,
          connect,
          disconnect,
          connecting,
          connected,
          address,
          chain,
          contract: {
            address: contractAddress,
            abi,
          },
        }}
      >
        {children}
      </Web3Context.Provider>
    )
  }
)
