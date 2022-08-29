import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import { Controller } from 'react-hook-form'

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
  const { roContract, bitsLibrary } = useWeb3()
  const setToken = useCallback(
    (idx: number, info: Record<string, unknown>) => {
      let token

      setTokens((tkns: Array<TokenState>) => {
        token = { ...tkns[idx], ...info }
        return ([
          ...tkns.slice(0, idx),
          ...Array.from({ length: idx - tkns.length }, () => ({})),
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
    if(roContract && bitsLibrary) {
      roContract.typeSupply()
      .then((supply: {
        toBigInt: () => bigint // call-bind?
      }) => supply.toBigInt())
      .then(setTypeCount)
      bitsLibrary.GATING_TYPE()
      .then((type: { toBigInt: () => bigint }) => type.toBigInt())
      .then(setGATING_TYPE)
      bitsLibrary.TYPE_WIDTH()
      .then(setTYPE_WIDTH)
      bitsLibrary.TYPE_BOUNDARY()
      .then(setTYPE_BOUNDARY)
    }
  }, [roContract, bitsLibrary])

  useEffect(() => {
    setVisibleList(toSpanList(visible))
  }, [visible])

  const controller = useRef(null)
  const retrieve = useCallback(
    async (tokens: Array<TokenState>) => {
      controller.current?.abort()
      controller.current = new AbortController()
      setTokens([])
      return (
        await Promise.allSettled(
          tokens.map(async (token, idx) => {
            try {
              const id: bigint = token.id ?? (
                (await roContract.tokenByIndex(token.index)).toBigInt()
              )

              const gating = token.is?.gating ?? (
                (
                  id
                  & (
                    (2n**BigInt(TYPE_WIDTH) - 1n) // TYPE_WIDTH 1s
                    << BigInt(TYPE_BOUNDARY)
                  )
                )
                === GATING_TYPE
              )

              const gates = token.gates ?? (gating ? (
                Number((2n**32n - 1n) & id)
              ) : ( null ))

              const is: { [key: string]: unknown } = {
                gating,
                hidden: token.hidable != false && gating && !gatingVisible,
              }

              setToken(
                idx,
                {
                  id: `0x${id.toString(16)}`,
                  index: token.index,
                  gates,
                  is,
                }
              )

              if(is.hidden) {
                throw new Error('Token is hidden.')
              }

              const uri = token.uri ?? (
                await roContract.uri(id)
              )
              if(uri === '') {
                throw new Error('No URI… Waiting for configuration…')
              }
              setToken(idx, { uri })

              const response = await fetch(
                httpURL(uri)!,
                { signal: controller.current.signal }
              )
              if(!response.ok) {
                throw new Error(`Request Status: ${response.status}`)
              }
              const data = await response.text()
              if(!data || data.trim() === '') {
                throw new Error('Aww, No Data. 😾')
              }

              setToken(idx, { metadata: JSON5.parse(data) })

              roContract.totalSupply(id)
              .then((total: bigint) => setToken(idx, { total }))

              roContract.getMax(id)
              .then((max: bigint) => setToken(idx, { max }))
            } catch(error) {
              console.error({ error })
              if(!(error instanceof DOMException)) { // !aborted
                return setToken(idx, {
                  error: extractMessage(error)
                })
              }
            }
          })
        )
      )
    },
    [
      GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH,
      gatingVisible, roContract, setToken,
    ],
  )

  useEffect(() => {
    const load = async () => {
      if(
        roContract && bitsLibrary && typeCount != null
        && TYPE_WIDTH != null && TYPE_BOUNDARY != null
        && GATING_TYPE != null
      ) {
        const tokens: Array<TokenState> = []
        if(visibleList.some(() => true)) {
          visibleList.forEach(
            (elem) => {
              let { high, low } = elem as Limits
              const sorted = [low, high] = (
                [low, high].sort((a, b) => (a - b))
              )
              if(sorted.some((elem) => elem == null)) {
                [high, low] = [elem as number, elem as number]
              }
              tokens.push(...(
                Array.from({ length: high - low + 1 })
                .map((_, idx) => ({
                  index: low + idx,
                  hidable: false,
                }))
              ))
            }
          )
        } else {
          const start = offset < 0 ? Number(typeCount) + offset : offset
          const count = Math.min(limit, Number(typeCount) - start)
          tokens.push(
            ...(
              Array.from({ length: count })
              .map((_, idx) => ({
                index: start + idx + 1,
              }))
            )
          )
        }

        await retrieve(tokens)
      }
    }
    load()
  }, [
    visibleList, retrieve, roContract, bitsLibrary,
    limit, offset, typeCount,
    TYPE_WIDTH, TYPE_BOUNDARY, GATING_TYPE,
  ])

  return (
    <Container maxW="full">
      <Helmet>
        <title>𝔐𝔢𝔱𝔞𝔊𝔞𝔪𝔢’𝔰 ’𝘾𝙝𝙞𝙚𝙫𝙚𝙢𝙞𝙣𝙩𝙨</title>
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