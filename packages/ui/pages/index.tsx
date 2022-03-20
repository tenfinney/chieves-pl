import { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box, Container, Flex, Image, Stack, Tooltip,
  Table, Thead, Tbody, Tr, Th, Td,
  Spinner, Text, Link as ChakraLink,
} from '@chakra-ui/react'
import Markdown from 'react-markdown'
import { httpURL } from '../lib/helpers'
import Logo from '../public/logo.svg'
import Header from '../public/header.svg'
import abi from '../contracts/BulkDisbersableNFTs.abi'
import address from '../contracts/BulkDisbersableNFTs.address'

type TokenState = {
  id: string
  state: 'premetadata' | 'prefetch' | 'loaded'
  uri?: string
  name?: string
  image?: string
  total?: number
}

const Home: NextPage = () => {
  const [tokens, setTokens] = useState<Array<TokenState>>([])
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_TOKEN_RPC
  )
  const contract = useMemo(
    () => new ethers.Contract(address, abi, provider),
    [],
  )

  const setToken = (index, info) => {
    console.info({ index, info })

    setTokens((tkns) => ([
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

          console.info({ tc: typeCount })

          await Promise.all(
            Array.from({ length: typeCount }).map(async (_, index) => {
              const id = `0x${(index + 1).toString(16)}`
              setToken(index, { id, state: 'premetadata' })
              const uri = await contract.uri(id)
              setToken(index, { uri, state: 'prefetch' })
              await Promise.all([
                (async () => {
                  const response = await fetch(httpURL(uri))
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
        <title>MetaGame’s NFTs</title>
        <meta name="description" content="MetaGame’s Achievements NFTs" />
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
            <Th grow={1}>Description</Th>
            <Th>Link</Th>
            <Th>Metadata</Th>
            <Th>Total</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map((token) => {
            if(token.state === 'loaded') {
              return (
                <Tr key={token.id}>
                  <Td>{token.id}</Td>
                  <Td>
                    <Stack><NextLink href={`/view/${token.id}`}>
                      <ChakraLink>
                        <Box
                          bg={
                            token.metadata.background_color ? (
                              `#${token.metadata.background_color}`
                            ) : (
                              'transparent'
                            )
                          }
                        >
                          <Image
                            src={httpURL(token.metadata.image)}
                            maxW={32}
                            maxH={32}
                            objectFit="contain"
                            margin="auto"
                          />
                        </Box>
                        <Text>{token.metadata.name}</Text>
                      </ChakraLink>
                    </NextLink></Stack>
                  </Td>
                  <Td
                    grow={1}
                    sx={{ a: { textDecoration: 'underline' } }}
                  >
                    <Markdown>{token.metadata.description}</Markdown>
                  </Td>
                  <Td>
                    {token.metadata.external_url && (
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
                    <Flex justify="center" fontSize="150%">
                      <ChakraLink href={httpURL(token.uri)} isExternal>
                        <Tooltip label={token.uri} hasArrow>
                          🔗
                        </Tooltip>
                      </ChakraLink>
                      <ChakraLink
                        ml={1}
                        onClick={() => {
                          navigator.clipboard.writeText(token.uri)
                        }}
                      >
                        <Tooltip label="Copy to Clipboard" hasArrow>
                          📋
                        </Tooltip>
                      </ChakraLink>
                    </Flex>
                  </Td>
                  <Td>{token.total?.toString() ?? <Spinner/>}</Td>
                  <Td></Td>
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
                            <Spinner thickness={4}/>
                            <Text ml={3}>Retrieving Token URI…</Text>
                          </Flex>
                        )
                      }
                      case 'prefetch': {
                        return (
                          <Flex>
                            <Spinner thickness={4}/>
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
