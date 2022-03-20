import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, Input } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { isEmpty } from '../../lib/helpers'
import { Maybe } from '../../lib/types'
import address from '../../contracts/BulkDisbersableNFTs.address'
import abi from '../../contracts/BulkDisbersableNFTs.abi'

const View: NextPage = () => {
  const [max, setMax] = useState(10)
  const [value, setValue] = useState<string | number>()
  const router = useRouter()

  let ethereum: Maybe<ethers.providers.ExternalProvider> = null
  if (typeof window !== 'undefined') {
    ({ ethereum } = window)
  }
  const provider = useMemo(
    () => (
      ethereum ? new ethers.providers.Web3Provider(ethereum) : null
    ),
    [ethereum],
  )
  const contract = useMemo(
    () => (provider ? (
      new ethers.Contract(address, abi, provider.getSigner())
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
        <title>View A NFT</title>
        <meta
          name="description"
          content="Pick one of MetaGame’s ’Chievemint NFTs to view."
        />
      </Head>

      <Box
        as="form"
        onSubmit={(evt: React.FormEvent) => {
          evt.preventDefault()
          router.push(`/view/0x${Number(value).toString(16)}`)
        }}
      >
        <Input
          type="number"
          min={1}
          {...{ max, value }}
          onChange={({ target: { value }}) => {
            setValue(isEmpty(value) ? value : Number(value))
          }}
        />
        <Button
          type="submit"
          isDisabled={[undefined, ''].includes(value as string)}
        >
          View{!isEmpty(value) ? ` #0x${Number(value).toString(16)}` : ''}
        </Button>
      </Box>
    </Container>
  )
}

export default View