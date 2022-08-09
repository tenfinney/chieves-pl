import React, { useState, useEffect } from 'react'
import {
  Container, Flex, chakra,
} from '@chakra-ui/react'
import { extractMessage, httpURL, toNumList } from '@/lib/helpers'
import type { Limits, Maybe, TokenState } from '@/lib/types'
import {
  Header, TokensTable, TokenFilterForm,
} from '@/components'
import { useWeb3 } from '@/lib/hooks'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'
import JSON5 from 'json5'

const Home = () => {
  const [tokens, setTokens] = useState<Array<TokenState>>([])
  const [query] = useSearchParams()
  const [limit, setLimit] = useState(Number(query.get('limit') ?? 10))
  const [offset, setOffset] = useState(Number(query.get('offset') ?? 0))
  const [gatingVisible, setGatingVisible] = (
    useState(!!query.get('gating') ?? false)
  )
  const visible = query.get('visible') ?? ''
  console.info({ visible, nl: toNumList(visible) })
  const [visibleList, setVisibleList] = (
    useState<Array<string | Limits>>(toNumList(visible))
  )
  const { roContract, constsContract } = useWeb3()
  const setToken = (index: number, info: Record<string, unknown>) => {
    setTokens((tkns: Array<TokenState>) => ([
      ...tkns.slice(0, index),
      { ...tkns[index], ...info },
      ...tkns.slice(index + 1),
    ]))
  }
  const [typeCount, setTypeCount] = useState(null)
  const [GATING_TYPE, setGATING_TYPE] = useState<Maybe<bigint>>(null)
  const [TYPE_WIDTH, setTYPE_WIDTH] = useState<Maybe<number>>(null)
  const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = (
    useState<Maybe<bigint>>(null)
  )

  useEffect(() => {
    if(roContract && constsContract) {
      roContract.typeSupply()
      .then((supply: {
        toBigInt: () => bigint // call-bind?
      }) => supply.toBigInt())
      .then(setTypeCount)
      constsContract.GATING_TYPE()
      .then((type: { toBigInt: () => bigint }) => type.toBigInt())
      .then(setGATING_TYPE)
      constsContract.TYPE_WIDTH()
      .then(setTYPE_WIDTH)
      constsContract.TYPE_BOUNDARY()
      .then(setTYPE_BOUNDARY)
    }
  }, [roContract, constsContract])

  useEffect(() => {
    console.info({ visible })
    setVisibleList(toNumList(visible))
  }, [visible])

  const tokenForIndex = async (index: number) => {
    try {
      const id: bigint = await (
        roContract.tokenByIndex(index).toBigInt()
      )
      const is: { [key: string]: unknown } = {}
      is.gating = (
        (
          BigInt(Number(id))
          & (
            2n**BigInt(TYPE_WIDTH) - 1n
            << BigInt(TYPE_BOUNDARY)
          )
        )
        === GATING_TYPE
      )
      is.hidden = is.gating && !gatingVisible
      return { id: id.toString(16), is, index }
    } catch(error) {
      return error
    }
  }

  useEffect(
    () => {
      const load = async () => {
        if(roContract && constsContract) {
          const generators: Array<Promise<Array<TokenState | Error>>> = []
          console.info({ generators })
          if(visibleList.some(() => true)) {
            generators.push(...(visibleList.map(
              async (elem) => {
                let { high, low } = elem as Limits
                const sorted = [low, high] = [high, low].sort() 
                console.info({ high, low })
                if(sorted.some((elem) => elem != null)) {
                  return (
                    await Promise.all(
                      Array.from({ length: high - low })
                      .map(async (_, idx) => (
                        await tokenForIndex(low + idx)
                      ))
                    )
                  )
                }
                return []
              }
            )) as Array<Promise<Array<TokenState | Error>>>)
          } else {
            // const count = Math.min(limit, typeCount - offset)
            // const start = offset < 0 ? typeCount + offset : offset

            // generators.push(
            //   ...Array.from({ length: count })
            //   .map(async (_, idx) => (
            //     await tokenForIndex(start + idx + 1)
            //   ))
            // )
          }
        }
      }
      load()
    }, [])

    useEffect(() => {
      const load = async () => {
        await Promise.all(
          tokens.map(async ({ id, is }, index) => {
            if(is.hidden) {
              return null
            }
            let metadata = null
            try {
              const uri = await roContract.uri(id)
              if(uri === '') throw new Error('No URI')
              setToken(index, { uri })
              const url = httpURL(uri)!
              const response = await fetch(url)
              const data = await response.text()
              if(!data || data === '') {
                throw new Error('No Data')
              }
              try {
                metadata = JSON5.parse(data)
              } catch(error) {
                console.error('JSON Error', { error, data })
              }
            } catch(error) {
                setToken(index, {
                  error: extractMessage(error),
                })
              } finally {
                setToken(index, { metadata })
              }

              const total = await roContract.totalSupply(id)
              setToken(index, { total })

              const max = await roContract.getMax(id)
              setToken(index, { max })
          })
        )
      }
      load()
    }, [
      roContract, constsContract,
      gatingVisible, visibleList,
      limit, offset, tokens,
    ],
  )

  return (
    <Container maxW="full">
      <Helmet>
        <title>𝔐𝔢𝔱𝔞𝔊𝔞𝔪𝔢’𝔰 ’𝓒𝓱𝓲𝓮𝓿𝓮𝓶𝓲𝓷𝓽𝓼</title>
        <meta
          name="description"
          content="MetaGame’s ’Chievemint NFTs"
        />
      </Helmet>

      <chakra.header h="45vh">
        <Flex maxW="40rem" margin="auto">
          <Header mt="5vh" h="40vh"/>
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
