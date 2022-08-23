import React, { useState, useEffect, useCallback } from 'react'
import {
  extractMessage, httpURL, toSpanList,
} from '@/lib/helpers'
import type { Limits, Maybe, TokenState } from '@/lib/types'
import { Header, TokenFilterForm, TokensTable } from '@/components'
import { useWeb3 } from '@/lib/hooks'
import { Helmet } from 'react-helmet'
import {
  useSearchParams, useNavigate, createSearchParams,
} from 'react-router-dom'
import JSON5 from 'json5'
import { defaults } from '@/config'
import { chakra, Button, Container, Flex, Text, Stack } from '@chakra-ui/react'

const Home = () => {
  const [tokens, setTokens] = useState<Array<TokenState | Error>>([])
  const [query] = useSearchParams()
  const [limit, setLimit] = useState(Number(query.get('limit') ?? defaults.limit))
  const [offset, setOffset] = useState(Number(query.get('offset') ?? defaults.offset))
  const [gatingVisible, setGatingVisible] = (
    useState(query.get('gating') === 'true')
  )
  const visible = query.get('visible') ?? defaults.visible
  const [visibleList, setVisibleList] = (
    useState<Array<number | Limits>>(toSpanList(visible))
  )
  const navigate = useNavigate()
  const { roContract, constsContract } = useWeb3()
  const setToken = useCallback(
    (idx: number, info: Record<string, unknown>) => {
      let token
      setTokens((tkns: Array<TokenState>) => {
        token = { ...tkns[idx], ...info }
        return ([
          ...tkns.slice(0, idx),
          token,
          ...tkns.slice(idx + 1),
        ])
      })
      return token
    },
    [setTokens],
  )
  const [typeCount, setTypeCount] = useState(null)
  const [GATING_TYPE, setGATING_TYPE] = useState<Maybe<bigint>>(null)
  const [TYPE_WIDTH, setTYPE_WIDTH] = useState<Maybe<number>>(null)
  const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = (
    useState<Maybe<number>>(null)
  )

  useEffect(() => {
    const params = {}
    if(visibleList?.length > 0) {
      Object.assign(params, {
        visible: visibleList.toString(),
      })
     } else {
      Object.entries({ limit, offset, gating: gatingVisible }).forEach(
        ([key, val]) => {
          if(val !== defaults[key as keyof typeof defaults]) {
            Object.assign(params, { [key]: val.toString() })
          }
        }
      )
    }

    const options = { search: `?${createSearchParams(params)}` }
    navigate(options, { replace: true })
  }, [visibleList, limit, offset, gatingVisible, navigate])

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
    setVisibleList(toSpanList(visible))
  }, [visible])

  const tokenForIndex = useCallback(
    async (index: number, hideable = true) => {
      const position = offset + (index - 1)
      try {
        const id: bigint = (
          (await roContract.tokenByIndex(index)).toBigInt()
        )
        const gating = (
          (
            id
            & (
              (2n**BigInt(TYPE_WIDTH) - 1n) // TYPE_WIDTH 1s
              << BigInt(TYPE_BOUNDARY)
            )
          )
          === GATING_TYPE
        )
        const is: { [key: string]: unknown } = {
          gating,
          hidden: hideable && gating && !gatingVisible,
        }

        return setToken(
          position,
          { id: `0x${id.toString(16)}`, is, index }
        )
      } catch(error) {
        return setToken(position, { error: extractMessage(error) })
      }
    },
    [GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH, gatingVisible, offset, roContract, setToken],
  )

  const retrieve = useCallback(
    async (tokens: Array<TokenState | Error>) => {
      return (
        await Promise.allSettled(
          tokens.map(async (token, idx) => {
            if(!(token instanceof Error)) {
              if(token.is?.hidden) {
                throw new Error('Token is hidden.')
              }

              try {
                const uri = await roContract.uri(token.id)
                if(uri === '') throw new Error('No URI… Waiting for configuration…')
                setToken(idx, { uri })
                const response = await fetch(httpURL(uri)!)
                const data = await response.text()
                if(!data || data.trim() === '') {
                  throw new Error('Aww, No Data. 😾')
                }
                try {
                  const [metadata, total, max] = await Promise.all([
                    Promise.resolve(JSON5.parse(data)),
                    roContract.totalSupply(token.id),
                    roContract.getMax(token.id),
                  ])

                  return setToken(idx, { metadata, total, max })
                } catch(error) {
                  console.error({ message: extractMessage(error), error, data })
                  throw error
                }
              } catch(error) {
                console.error({ stack: (error as Error).stack })
                return setToken(idx, {
                  error: extractMessage(error),
                })
              }
            }
          })
        )
      )
    },
    [roContract, setToken],
  )

  useEffect(() => {
    const load = async () => {
      if(roContract && constsContract) {
        const generators: Array<Promise<Array<TokenState | Error>>> = []
        if(visibleList.some(() => true)) {
          generators.push(...(visibleList.map(
            async (elem) => {
              let { high, low } = elem as Limits
              const sorted = [high, low]
              sorted.sort()
              ;[low, high] = sorted
              if(!sorted.some((elem) => elem != null)) {
                [high, low] = [elem as number, elem as number]
              }
              return (
                await Promise.all(
                  Array.from({ length: high - low + 1 })
                  .map(async (_, idx) => (
                    await tokenForIndex(low + idx, false)
                  ))
                )
              )
            }
          )) as Array<Promise<Array<TokenState | Error>>>)
        } else {
          const start = offset < 0 ? typeCount + offset : offset
          const count = Math.min(limit, Number(typeCount) - start)
          generators.push(
            ...(Array.from({ length: count })
            .map(async (_, idx) => (
              await tokenForIndex(start + idx + 1)
            )))
          )
        }
        const tokens = (await Promise.all(generators)).flat()
        await retrieve(tokens)
      }
    }
    load()
  }, [visibleList, retrieve, roContract, constsContract, limit, offset, tokenForIndex, typeCount])

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
        <Stack align="center">
          <TokenFilterForm
            flexGrow={1}
            {...{
              limit, setLimit,
              offset, setOffset,
              gatingVisible, setGatingVisible,
              visibleList, setVisibleList,
            }}
          />
          <TokensTable {...{ tokens }}/>
          <Flex justify="center">
            <Button
              onClick={() => {
                if(visibleList.length > 0) {
                  const potentials = visibleList.map(
                    (entry) => ((entry as Limits)?.high ?? entry) as number
                  )
                  const max = Math.max(...potentials)
                  setVisibleList((vis) => ([
                    ...vis, { low: max, high: max + 10 }
                  ]))
                } else {
                  setLimit((lim) => lim + 10)
                }
              }}
            >
              <Text as="span" mr={1} mt={-0.5} fontSize="150%" fontWeight="bold">+</Text>10
            </Button>
            <Button
              ml={5}
              onClick={() => setOffset((off) => off + limit)}
            >
              <Text as="span" mr={0.75} mt={-1} fontSize="200%" fontWeight="bold">↓</Text>{limit}
            </Button>
          </Flex>
        </Stack>
      </chakra.main>
    </Container>
  )
}

export default Home