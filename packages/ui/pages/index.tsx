import { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box, Container, Flex, Image, Stack, Tooltip,
  Table, Thead, Tbody, Tr, Th, Td,
  Spinner, Text, Link as ChakraLink, chakra,
} from '@chakra-ui/react'
import Markdown from 'react-markdown'
import { httpURL } from 'lib/helpers'
import Logo from '../public/logo.svg'
import Header from '../public/header.svg'
import type { Maybe, ERC1155Metadata } from 'lib/types'
import abi from 'contracts/BulkDisbersableNFTs.abi'
import address from 'contracts/BulkDisbersableNFTs.address'

type TokenState = {
  id: string
  state: 'premetadata' | 'prefetch' | 'loaded' | 'error'
  uri?: string
  metadata?: ERC1155Metadata
  total?: number
  error?: string
}

const Home: NextPage = () => {
  const [tokens, setTokens] = useState<Array<TokenState>>([])
  const provider = useMemo(
    () => (
      new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_TOKEN_RPC
      )
    ),
    [],
  )

  const contract = useMemo(
    () => new ethers.Contract(address, abi, provider),
    [provider],
  )

  const setToken = (index: number, info: Record<string, unknown>) => {
    setTokens((tkns: Array<TokenState>) => ([
      ...tkns.slice(0, index),
      { ...tkns[index], ...info },
      ...tkns.slice(index + 1),
    ]))
  }

  useEffect(
    () => {
      const load = async () => {
        if(contract) {
          const typeCount = Number(await contract.tokenTypeCount())

          await Promise.all(
            Array.from({ length: typeCount }).map(async (_, index) => {
              const id = `0x${(index + 1).toString(16)}`
              setToken(index, { id, state: 'premetadata' })
              const uri = await contract.uri(id)
              setToken(index, { uri, state: 'prefetch' })
              await Promise.all([
                (async () => {
                  const url = httpURL(uri)
                  if(!url) throw new Error(`Missing URI for token #${id}.`)
                  const response = await fetch(url)
                  const metadata = await response.json()
                  setToken(index, { metadata, state: 'loaded' })
                })(),
                (async () => {
                  const total = await contract.totalSupply(id)
                  setToken(index, { total })
                })(),
              ])
            })
          )
        }
      }

      load()
    },
    [contract],
  )

  return (
    <Container maxW="full">
      <Head>
        <chakra.title>’Chievemint NFTs</chakra.title>
        <chakra.meta
          name="description"
          content="MetaGame’s ’Chievemint NFTs"
        />
      </Head>

      <Flex h="33vh" maxW="40rem" margin="auto">
        <Logo style={{ height: '-webkit-fill-available', width: '40%' }}/>
        <Header style={{ height: '-webkit-fill-available', width: '60%' }}/>
      </Flex>

      <Table
        sx={{
          'th, td': { textAlign: 'center' },
          a: { borderBottom: '2px dotted transparent' },
          'a:hover': {
            textDecoration: 'none',
            borderBottom: '2px dotted',
          },
        }}
      >
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Display</Th>
            <Th flexGrow={1}>Description</Th>
            <Th>Link</Th>
            <Th>Metadata</Th>
            <Th>Total</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map((token: TokenState) => {
            if(token.state === 'loaded') {
              return (
                <Tr key={token.id}>
                  <Td>{token.id}</Td>
                  <Td>
                    <Stack><NextLink href={`/view/${token.id}`} passHref>
                      <ChakraLink>
                        <Box
                          bg={
                            token.metadata?.background_color ? (
                              `#${token.metadata.background_color}`
                            ) : (
                              'transparent'
                            )
                          }
                        >
                          {token.metadata?.image && (
                            <Image
                              src={httpURL(token.metadata.image)}
                              alt={token.metadata?.name ?? 'Untitled'}
                              maxW={32}
                              maxH={32}
                              objectFit="contain"
                              margin="auto"
                            />
                          )}
                        </Box>
                        <Text>{token.metadata?.name ?? (
                          <Text as="em">Untitled</Text>
                        )}</Text>
                      </ChakraLink>
                    </NextLink></Stack>
                  </Td>
                  <Td
                    flexGrow={1}
                    sx={{ a: { textDecoration: 'underline' } }}
                  >
                    <Markdown>{token.metadata?.description ?? (
                      '*No Description*'
                    )}</Markdown>
                  </Td>
                  <Td>
                    {token.metadata?.external_url && (
                      <ChakraLink
                        href={token.metadata.external_url}
                        isExternal
                        fontSize="150%"
                      >
                        <Tooltip label={token.metadata.external_url} hasArrow>
                          🌐
                        </Tooltip>
                      </ChakraLink>
                    )}
                  </Td>
                  <Td>
                    {token.uri && (
                      <Flex justify="center" fontSize="150%">
                        <ChakraLink href={httpURL(token.uri)} isExternal>
                          <Tooltip label={token.uri} hasArrow>
                            🔗
                          </Tooltip>
                        </ChakraLink>
                        <ChakraLink
                          ml={2}
                          onClick={() => {
                            if(token.uri) {
                              navigator.clipboard.writeText(token.uri)
                            }
                          }}
                        >
                          <Tooltip label="Copy to Clipboard" hasArrow>
                            📋
                          </Tooltip>
                        </ChakraLink>
                      </Flex>
                    )}
                  </Td>
                  <Td>{token.total?.toString() ?? <Spinner/>}</Td>
                  <Td>
                    <Flex justify="center" fontSize="150%">
                      <NextLink href={`/edit/${token.id}`} passHref>
                        <ChakraLink>
                          <Tooltip label="Edit Metadata" hasArrow>
                            ✏️
                          </Tooltip>
                        </ChakraLink>
                      </NextLink>
                      <NextLink href={`/view/${token.id}`} passHref>
                        <ChakraLink ml={2}>
                          <Tooltip label="View This NFT" hasArrow>
                            👁
                          </Tooltip>
                        </ChakraLink>
                      </NextLink>
                      <NextLink href={`/disberse/${token.id}`} passHref>
                        <ChakraLink ml={2}>
                          <Tooltip label="Disberse This NFT" hasArrow>
                            💸
                          </Tooltip>
                        </ChakraLink>
                      </NextLink>
                    </Flex>
                  </Td>
                </Tr>
              )
            }
            return (
              <Tr key={token.id}>
                <Td>{token.id}</Td>
                <Td colSpan={4}>
                  {(() => {
                    switch(token.state) {
                      case 'premetadata': {
                        return (
                          <Flex>
                            <Spinner thickness="4px"/>
                            <Text ml={3}>Retrieving Token URI…</Text>
                          </Flex>
                        )
                      }
                      case 'prefetch': {
                        return (
                          <Flex>
                            <Spinner thickness="4px"/>
                            <Text ml={3}>Loading Metadata…</Text>
                          </Flex>
                        )
                      }
                      case 'error': {
                        return (
                          <Text colorScheme="red">{token.error}</Text>
                        )
                      }
                      default: {
                        return (
                          <Text>Unknown Token State: {token.state}</Text>
                        )
                      }
                    }
                  })()}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Container>
  )
}

export default Home
