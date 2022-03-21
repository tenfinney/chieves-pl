import { useEffect, useMemo, useState } from 'react'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box,
  Button, Container, Image, Input, chakra, Heading,
  Flex, Spinner, Text,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import { httpURL, isEmpty } from 'lib/helpers'
import { Maybe } from 'lib/types'
import address from 'contracts/BulkDisbersableNFTs.address'
import abi from 'contracts/BulkDisbersableNFTs.abi'

const Markdown = chakra(ReactMarkdown)

const View: NextPage = () => {
  const router = useRouter()
  const tokenId = router.query.nft_id
  const [metadata, setMetadata] = useState<Record<string, unknown>>()
  const [error, setError] = useState<string>()

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
      const getMetadata = async () => {
        if(contract && tokenId) {
          try {
            const metadataURI = await contract.uri(ethers.BigNumber.from(Number(tokenId)))
            const metadataURL = httpURL(metadataURI)
            if(!metadataURL) {
              throw new Error(`Couldn't find metadata for token #${tokenId}.`)
            }
            const response = await fetch(metadataURL)
            setMetadata(await response.json())
          } catch(err) {
            setError((err as Error).message)
          }
        }
      }

      getMetadata()
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

  if(!metadata) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner thickness="4px" speed="1s" mr={2}/>
        <Text>Loading Metadata For Token #{tokenId}</Text>
      </Flex>
    )
  }

  const {
    name, image, animation_url: animationURL,
    description,
  } = metadata

  return (
    <Container maxW="full" align="center">
      <Head>
        <title>View NFT #{tokenId}</title>
        <meta
          name="description"
          content="MetaGame’s ’Chievemint NFTs"
        />
      </Head>
      {name && <Heading>{name}</Heading>}
      {image && (
        <Image
          src={httpURL(image)}
          alt={name}
          maxW={64}
          maxH={64}
        />
      )}
      {description && (
        <Markdown
          sx={{ a: { textDecoration: 'underline' } }}
        >
          {description}
        </Markdown>
      )}
      {animationURL && (
        <chakra.video
          maxW={60} maxH={60}
          controls autoPlay loop muted
        >
          <chakra.source src={httpURL(animationURL)}/>
        </chakra.video>
      )}
    </Container>
  )
}

export default View