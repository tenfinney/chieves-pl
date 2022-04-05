import { useEffect, useMemo, useState } from 'react'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle,
  Image, chakra, Heading, Stack, Flex, Spinner, Text,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import { httpURL } from 'lib/helpers'
import type { ERC1155Metadata } from 'lib/types'
import address from 'contracts/BulkDisbersableNFTs.address'
import abi from 'contracts/BulkDisbersableNFTs.abi'
import { HomeLink } from 'components'

const Markdown = chakra(ReactMarkdown)

const View: NextPage = () => {
  const { query: { nftId } } = useRouter()
  const [metadata, setMetadata] = useState<ERC1155Metadata>()
  const [error, setError] = useState<string>()

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
        if(contract && nftId) {
          try {
            const metadataURI = await contract.uri(ethers.BigNumber.from(Number(nftId)))
            const metadataURL = httpURL(metadataURI)
            if(!metadataURL) {
              throw new Error(`Couldn't find metadata for token #${nftId}.`)
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
    [contract, nftId],
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
        <Text>Loading Metadata For Token #{nftId}</Text>
      </Flex>
    )
  }

  const {
    name, image, animation_url: animationURL,
    description,
  } = metadata

  return (
    <Stack align="center" position="relative">
      <Head>
        <title>’𝖈𝖍𝖎𝖊𝖛𝖊: 𝓥ⲓⲉⲱ #{nftId}</title>
        <meta
          name="description"
          content="MetaGame’s ’Chievemint NFTs"
        />
      </Head>
      <HomeLink/>
      {name && <Heading>{name}</Heading>}
      {image && (
        <Image
          src={httpURL(image)}
          alt={name}
          maxW={72}
          maxH={72}
        />
      )}
      {description && (
        <Markdown
          sx={{ a: { textDecoration: 'underline' } }}
          linkTarget="_blank"
        >
          {description}
        </Markdown>
      )}
      {animationURL && (
        <chakra.video
          maxW={96} maxH={96}
          controls autoPlay loop muted
        >
          <chakra.source src={httpURL(animationURL)}/>
        </chakra.video>
      )}
    </Stack>
  )
}

export default View