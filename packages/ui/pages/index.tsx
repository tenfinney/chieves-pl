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
import { Header, Header0, TokensTable } from 'components'
import { useWeb3 } from 'lib/hooks'
import { useRouter } from 'next/router'
import TokenFilterForm from 'components/TokenFilterForm'

const Home: NextPage = () => {
  const [tokens, setTokens] = useState<Array<TokenState>>([])
  const {
    query: { gating = false, visible: visibleParam, limit: limitParam = 10, offset: offsetParam = 0 }
  } = useRouter()
  const [limit, setLimit] = useState(Number(limitParam))
  const [offset, setOffset] = useState(Number(offsetParam))
  const [gatingVisible, setGatingVisible] = useState(!!gating)
  const [visibleList, setVisibleList] = useState<Array<string>>([])
  const { roContract } = useWeb3()
  const setToken = (index: number, info: Record<string, unknown>) => {
    setTokens((tkns: Array<TokenState>) => ([
      ...tkns.slice(0, index),
      { ...tkns[index], ...info },
      ...tkns.slice(index + 1),
    ]))
  }

  useEffect(() => {
    setGatingVisible(!!gating)
  }, [gating])

  useEffect(() => {
    setOffset(Number(offsetParam))
  }, [offsetParam])

  useEffect(() => {
    setLimit(Number(limitParam))
  }, [limitParam])

  useEffect(() => {
    let visible = visibleParam
    if (visible) {
      if (Array.isArray(visible)) {
        ([visible] = visible)
      }
      setVisibleList(visible.split(/\s*,\s*/).filter((str) => str !== ''))
    }
  }, [visibleParam])

  useEffect(
    () => {
      const load = async () => {
        if(roContract) {
          const typeCount = Number(await roContract.typeSupply())
          const GATING_TYPE = await roContract.GATING_TYPE()
          const TYPE_WIDTH = await roContract.TYPE_WIDTH()
          const TYPE_BOUNDARY = await roContract.TYPE_BOUNDARY()

          const count = Math.min(limit, typeCount)
          const start = offset < 0 ? typeCount + offset : offset 
          const tokens = await Promise.all(
            Array.from({ length: count }).map(
              async (_, idx) => {
                const index = start + idx + 1
                const id = (await roContract.tokenByIndex(index))
                const hide = (
                  (
                    !gatingVisible
                    && (
                      (id.toBigInt() & ((BigInt(2**TYPE_WIDTH - 1)) << BigInt(TYPE_BOUNDARY)))
                      === GATING_TYPE.toBigInt()
                    )
                  )
                  || (
                    visibleList.length > 0
                    && !visibleList.includes((index).toString())
                  ) 
                )

                return { id: id.toHexString(), hide, index }
              }
            )
          )

          setTokens(tokens)

          await Promise.all(
            tokens.map(async ({ id, hide }, index) => {
              if(hide) {
                return null
              }
              let metadata = null
              try {
                let uri = await roContract.uri(id)
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

              const total = await roContract['totalSupply(uint256)'](id)
              setToken(index, { total })

              // const max = await contract.getMax(id)
              // setToken(index, { max })
            })
          )
        }
      }

      load()
    },
    [roContract, gatingVisible, visibleList, limit], 
  )

  return (
    <Container maxW="full">
      <Head>
        <title>SmartLaw Cred Tokens</title>
        <meta
          name="description"
          content="SmartLaw Cred Tokens"
        />
      </Head>

      <chakra.header h="30vh">
        <Flex maxW="40rem" margin="auto">
          <Header0 mt="1vh" h="10vh"/>
        </Flex>
        <Flex maxW="40rem" margin="auto">
          <Header mt="1vh" h="20vh"/>
        </Flex>

      </chakra.header>

      <chakra.main>
        <TokenFilterForm
          {...{
            limit, setLimit,
            offset, setOffset,
            gatingVisible, setGatingVisible,
            visibleList, setVisibleList,
          }}
        />
        <TokensTable {...{ tokens }}/>
      </chakra.main>
    </Container>
  )
}

export default Home
