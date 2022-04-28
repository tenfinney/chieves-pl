import { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box, Container, Flex, Image, Stack, Tooltip,
  Table, Thead, Tbody, Tr, Th, Td,
  Spinner, Text, Link as ChakraLink, chakra,
} from '@chakra-ui/react'
import Markdown from 'react-markdown'
import { httpURL } from 'lib/helpers'
import type { Maybe, ERC1155Metadata, TokenState } from 'lib/types'
import { Header, TokensTable } from 'components'
import { useWeb3 } from 'lib/hooks'

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
  const { contract: { address, abi } } = useWeb3()

  const contract = useMemo(
    () => new ethers.Contract(address, abi, provider),
    [provider],
  )

  const setToken = (index: number, info: Record<string, unknown>) => {
    console.log({ t: {...tokens[index], ...info}})

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
          console.log({contract})
          console.log(await contract.owner())
          const typeCount = Number(await contract['totalSupply()']())

          await Promise.allSettled(
            Array.from({ length: typeCount }).map(async (_, index) => {
              const id = (await contract.tokenByIndex(index)).toHexString()
              console.log({id})
              let metadata = null
              try {
                setToken(index, { id })
                let uri = await contract.uri(id)
                if(uri === '') uri = null
                setToken(index, { uri })

                const url = httpURL(uri)
                const response = await fetch(url)
                const data = await response.text()
                if(!data || data === '') {
                  throw new Error('No Data')
                }
                try {
                  metadata = JSON.parse(data)
                } catch(error) {
                  console.error('JSON Error', { error, data })
                }
              } catch(error) {
                console.warn({ error })
                setToken(index, {
                  error: (error as Error).message ?? error
                })
              } finally {
                setToken(index, { metadata })
              }

              const total = await contract['totalSupply(uint256)']( id )
              setToken(index, { total })


              // const max = await contract.getMax(id)
              // setToken(index, { max })
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
        <title>𝔐𝔢𝔱𝔞𝔊𝔞𝔪𝔢’𝔰 ’𝓒𝓱𝓲𝓮𝓿𝓮𝓶𝓲𝓷𝓽𝓼</title>
        <meta
          name="description"
          content="MetaGame’s ’Chievemint NFTs"
        />
      </Head>

      <chakra.header>
        <Flex maxW="40rem" margin="auto">
          <Header mt="5vh" maxH="40vh"/>
        </Flex>
      </chakra.header>

      <chakra.main>
        <TokensTable {...{ tokens }}/>
      </chakra.main>
    </Container>
  )
}

export default Home
