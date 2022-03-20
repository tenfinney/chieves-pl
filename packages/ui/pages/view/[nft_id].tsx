import { useEffect, useMemo, useState } from 'react'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box,
  Button, Container, Image, Input,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { httpURL, isEmpty } from '../../lib/helpers'
import address from '../../contracts/BulkDisbersableNFTs.address'
import abi from '../../contracts/BulkDisbersableNFTs.abi'

const View: NextPage = () => {
  const router = useRouter()
  const tokenId = router.query.nft_id
  const [metadata, setMetadata] = useState<Record<string, unknown>>()
  const [error, setError] = useState<string>()

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
      const getMetadata = async () => {
        try {
          const metadataURI = await contract.uri(ethers.BigNumber.from(Number(tokenId)))
          const response = await fetch(httpURL(metadataURI))
          setMetadata(await response.json())
        } catch(err) {
          console.info({ tokenId })
          setError(err.message)
        }
      }
      if(contract && tokenId) {
        getMetadata()
      }
    },
    [contract, tokenId],
  )

  if(error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error: Loading NFT</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Container>
      <Head>
        <title>View NFT {}</title>
        <meta name="description" content="MetaGame’s Achievements NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <pre>
        {JSON.stringify(metadata, null, 2)}
      </pre>
    </Container>
  )
}

export default View