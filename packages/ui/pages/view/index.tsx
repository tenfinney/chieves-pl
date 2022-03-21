import {
  useEffect, useMemo, useState, ChangeEvent, FormEvent
} from 'react'
import {
  chakra, Box, Button, Container, Input, Stack, Heading,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { isEmpty } from 'lib/helpers'
import { Maybe } from 'lib/types'
import address from 'contracts/BulkDisbersableNFTs.address'
import abi from 'contracts/BulkDisbersableNFTs.abi'

const View: NextPage = () => {
  const [max, setMax] = useState(10)
  const [value, setValue] = useState<string | number>()
  const router = useRouter()

  // let ethereum: Maybe<ethers.providers.ExternalProvider> = null
  // if (typeof window !== 'undefined') {
  //   ({ ethereum } = window)
  // }
  // const provider = useMemo(
  //   () => (
  //     ethereum ? new ethers.providers.Web3Provider(ethereum) : null
  //   ),
  //   [ethereum],
  // )
  const provider = useMemo(
    () => (
      new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_TOKEN_RPC
      )
    ),
    [],
  )
  const contract = useMemo(
    () => (provider ? (
      new ethers.Contract(address, abi, provider)
    ) : (
      null
    )),
    [provider],
  )

  useEffect(
    () => {
      const getMax = async () => {
        if(contract) {
          console.info({ m: Number(await contract.tokenTypeCount()) })
          setMax(Number(await contract.tokenTypeCount()))
        }
      }
      getMax()
    },
    [contract],
  )

  return (
    <Container>
      <Head>
        <chakra.title>View A NFT</chakra.title>
        <chakra.meta
          name="description"
          content="Pick one of MetaGame’s ’Chievemint NFTs to view."
        />
      </Head>

      <Stack
        as="form"
        align="center"
        justify="center"
        h="100vh"
        onSubmit={(evt: FormEvent) => {
          evt.preventDefault()
          router.push(`/view/0x${Number(value).toString(16)}`)
        }}
      >
        <Heading textAlign="center">
          Enter the ID of a ’Chievemint NFT to view.
        </Heading>
        <Input
          type="number"
          min={1}
          {...{ max, value }}
          autoFocus
          onChange={({ target: { value }}: ChangeEvent) => {
            setValue(isEmpty(value) ? value : Number(value))
          }}
        />
        <Button
          type="submit"
          isDisabled={[undefined, ''].includes(value as string)}
        >
          View{(value && !isEmpty(value)) ? ` #0x${Number(value).toString(16)}` : ''}
        </Button>
      </Stack>
    </Container>
  )
}

export default View