import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import {
  Container, Flex, chakra,
} from '@chakra-ui/react'
import { httpURL } from '@/lib/helpers'
import type { TokenState } from '@/lib/types'
import {
  Header, TokensTable, TokenFilterForm,
} from '@/components'
import { useWeb3 } from '@/lib/hooks'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'

const Home: NextPage = () => {
  const [tokens, setTokens] = useState<Array<TokenState>>([])
  const [query] = useSearchParams()
  const visible = query.get('visible') ?? ''
  const [limit, setLimit] = useState(Number(query.get('limit') ?? 10))
  const [offset, setOffset] = useState(Number(query.get('offset') ?? 0))
  const [gatingVisible, setGatingVisible] = (
    useState(!!query.get('gating') ?? false)
  )
  const [visibleList, setVisibleList] = useState<Array<string>>([])
  const { roContract, constsContract } = useWeb3()
  const setToken = (index: number, info: Record<string, unknown>) => {
    setTokens((tkns: Array<TokenState>) => ([
      ...tkns.slice(0, index),
      { ...tkns[index], ...info },
      ...tkns.slice(index + 1),
    ]))
  }

  useEffect(() => {
    setVisibleList(visible.split(/\s*,\s*/)
    .filter((str) => str !== ''))
  }, [visible])

  useEffect(
    () => {
      const load = async () => {
        if(roContract && constsContract) {
          const typeCount = Number(await roContract.typeSupply())
          const GATING_TYPE = await constsContract.GATING_TYPE()
          const TYPE_WIDTH = await constsContract.TYPE_WIDTH()
          const TYPE_BOUNDARY = await constsContract.TYPE_BOUNDARY()

          const count = Math.min(limit, typeCount)
          const start = offset < 0 ? typeCount + offset : offset
          const tokens = (await Promise.all(
            Array.from({ length: count }).map(
              async (_, idx) => {
                try {
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
                } catch(err) {
                  return null
                }
              }
            )
          )).filter((tkn): tkn is TokenState => Boolean(tkn))

          setTokens(tokens)

          await Promise.all(
            tokens.map(async ({ id, hide }, index) => {
              if(hide) {
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
                  metadata = JSON.parse(data)
                } catch(error) {
                  console.error('JSON Error', { error, data })
                }
              } catch(error) {
                setToken(index, {
                  error: (error as Error).message ?? error
                })
              } finally {
                setToken(index, { metadata })
              }

              const total = await roContract['totalSupply(uint256)'](id)
              setToken(index, { total })

              const max = await roContract.getMax(id)
              setToken(index, { max })
            })
          )
        }
      }

      load()
    },
    [roContract, constsContract, gatingVisible, visibleList, limit, offset],
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
