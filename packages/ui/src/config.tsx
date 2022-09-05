import {
  FormControl, FormLabel, Input, InputGroup,
  Modal, ModalBody, ModalCloseButton, Link,
  ModalContent, ModalHeader, ModalOverlay,
  useDisclosure, Text, ModalFooter, Stack, Flex, Button,
} from '@chakra-ui/react'
import { NFTStorage } from 'nft.storage'
import React, { useCallback, useMemo, useState } from 'react'
import { Maybe } from './lib/types'

declare const CHAIN_NAME: string
declare const IPFS_LINK_PATTERN: string
declare const NFT_STORAGE_API_TOKEN: string
declare const NFT_GRAPH: string
declare const NFT_BASE: string

export const contractNetwork = (
  (
    (typeof CHAIN_NAME !== 'undefined') ? (
      CHAIN_NAME
    ) : (
      'polygon'
    )
  )
)

export const ipfsLinkPattern = (
    (
    (typeof IPFS_LINK_PATTERN !== 'undefined') ? (
      IPFS_LINK_PATTERN
    ) : (
      'https://{v1cid}.ipfs.nftstorage.link/{path}'
    )
  )
)

export const nftGraph = (
  (
    (typeof NFT_GRAPH !== 'undefined') ? (
      NFT_GRAPH
    ) : (
      'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
    )
  )
)

export const nftBase = (
  (
    (typeof NFT_BASE !== 'undefined') ? (
      NFT_BASE
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

export const tokenPermissions = [
  'Superuser', 'Minter', 'Caster', 'Transferer',
  'Configurer', 'Limiter', 'Burner', 'Destroyer',
]

export const defaults = {
  limit: 10,
  offset: 0,
  gating: false,
  visible: '',
}

export const useConfig = ({ requireStorage = false } = {}) => {
  const store = localStorage
  const [nftStorageAPIToken, baseSetNFTStorageAPIToken] = (
    useState(
      store.getItem('chievemints-nftStorageAPIToken')
      ?? (typeof NFT_STORAGE_API_TOKEN !== 'undefined' ? (
        NFT_STORAGE_API_TOKEN
      ) : (
        null
      ))
    )
  )
  const setNFTStorageAPIToken = useCallback(
    (token: Maybe<string>) => {
      store.setItem('chievemints-nftStorageAPIToken', token)
      baseSetNFTStorageAPIToken(token)
    },
    [store],
  )
  const [
    internalNFTStorageAPIToken,
    internalSetNFTStorageAPIToken
  ] = (
    useState(nftStorageAPIToken)
  )
  const storage = useMemo(() => (
    nftStorageAPIToken ? (
      new NFTStorage({ token: nftStorageAPIToken })
    ) : (
      null
    )
  ), [nftStorageAPIToken])

  const { isOpen, onOpen, onClose } = useDisclosure()
  if(!isOpen && !nftStorageAPIToken && requireStorage) {
    onOpen()
  }

  const Settings: React.FC<{ highlight: Array<string> }> = (
    useCallback(({ highlight }) => (
      <Modal {...{ isOpen, onClose }}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton/>
          <ModalBody
            sx={{
              a: { borderBottom: '1px dashed' },
            }}
          >
            <FormControl mb={3}>
              <FormLabel>
                <Link target="_blank" href="//nft.storage" mr={1}>
                  NFT.Storage
                </Link>
                API Token
                <Text as="span" color="red" fontSize="120%">
                  *
                </Text>
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="Required Token"
                  bg={highlight.includes('nftStorageAPIToken') ? (
                    '#FFFF0066'
                  ) : (
                    'transparent'
                  )}
                  value={internalNFTStorageAPIToken}
                  onChange={({ target: { value } }) => {
                    internalSetNFTStorageAPIToken(value)
                  }}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Stack w="full">
              {/* <Flex mb={5}>
                <Button 
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setGw('http://{v1cid}.ipfs.localhost:8080/{path}')
                    setDelay(0)
                  }}
                >
                  Use <chakra.code ml={2}>localhost</chakra.code>
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setGw(ipfsLinkPattern)
                    setDelay(Number(ipfsLimitingDelay))
                  }}
                >
                  Use Defaults
                </Button>
              </Flex> */}

              <Flex alignSelf="end">
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    setNFTStorageAPIToken(
                      internalNFTStorageAPIToken
                    )
                    onClose()
                  }}
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ), [internalNFTStorageAPIToken, isOpen, onClose, setNFTStorageAPIToken])
  )

  const settings = useMemo(() => ({
    Settings,
    storage,
  }), [Settings, storage])

  return settings
}