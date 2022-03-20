import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, Input } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { isEmpty } from '../../lib/helpers'
import address from '../../contracts/BulkDisbersableNFTs.address'
import abi from '../../contracts/BulkDisbersableNFTs.abi'

const View: NextPage = () => {
  const [max, setMax] = useState(10)
  const [value, setValue] = useState('')
  const router = useRouter()

  let ethereum: Maybe<ExternalProvider> = null
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
        console.info({ m: Number(await contract.tokenTypeCount()) })
        setMax(Number(await contract.tokenTypeCount()))
      }
      if(contract) {
        getMax()
      }
    },
    [contract],
  )

  return (
    <Container>
      <Head>
        <title>Pick A NFT</title>
        <meta
          name="description"
          content="Pick One Of MetaGame’s Achievements NFTs To View"
        />
      </Head>

      <Box
        as="form"
        onSubmit={(evt) => {
          evt.preventDefault()
          router.push(`/view/0x${value.toString(16)}`)
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
        <Button type="submit" isDisabled={[undefined, ''].includes(value)}>
          View
        </Button>
      </Box>
    </Container>
  )
}

export default View