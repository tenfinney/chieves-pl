import React, { useEffect, useState } from 'react'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle,
  Image, chakra, Heading, Stack, Flex, Spinner, Text,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import JSON5 from 'json5'
import {
  regexify, deregexify, httpURL,
} from '@/lib/helpers'
import type { ERC1155Metadata } from '@/lib/types'
import { HomeLink } from '@/components'
import { useWeb3 } from '@/lib/hooks'

const Markdown = chakra(ReactMarkdown)

export const View: React.FC<{ tokenId: string, header?: boolean }> = (
  ({ tokenId, header = true }) => {
    const [metadata, setMetadata] = useState<ERC1155Metadata>()
    const [error, setError] = useState<string>()
    const { roContract } = useWeb3()

    useEffect(
      () => {
        const getMetadata = async () => {
          if(roContract && tokenId) {
            try {
              let realId = BigInt(tokenId)
              if(realId < 2**32) {
                realId = await roContract.tokenByIndex(realId)
              }

              const metadataURI = await roContract.uri(realId)
              const metadataURL = httpURL(metadataURI)
              if(!metadataURL) {
                throw new Error(
                  `Couldn't find metadata for token #${regexify(tokenId)}.`
                )
              }
              const response = await fetch(metadataURL)
              const data = await response.text()
              setMetadata(JSON5.parse(data))
            } catch(err) {
              setError((err as Error).message)
            }
          }
        }

        getMetadata()
      },
      [roContract, tokenId],
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
          <Text>Loading Metadata For Token #{regexify(tokenId)}</Text>
        </Flex>
      )
    }

    const {
      name, image, animation_url: animation,
      description, background_color: bg,
    } = metadata

    return (
      <Stack align="center" position="relative">
        {header && (
          <Helmet>
            <title>’𝖈𝖍𝖎𝖊𝖛𝖊: 𝓥ⲓⲉⲱ #{regexify(tokenId)}</title>
            <meta
              name="description"
              content="MetaGame’s ’Chievemint NFTs"
            />
          </Helmet>
        )}
        <HomeLink/>
        {name && <Heading>{name}</Heading>}
        {image && (
          <chakra.object
            data={httpURL(image) ?? undefined}
            title={name}
            pointerEvents="none"
            maxW="80vmin" maxH="80vmin"
            bg={`#${bg}`}
            borderRadius={15}
            p={2}
          />
        )}
        {description && (
          <Markdown
            maxW="30rem"
            sx={{
              a: { textDecoration: 'underline' },
              p: {
                textIndent: '1em',
                my: 3,
                textAlign: 'justify',
              },
            }}
            linkTarget="_blank"
          >
            {description}
          </Markdown>
        )}
        {animation && (
          (() => {
            const url = httpURL(animation) ?? undefined
            const props = { maxW: 96, maxH: 96 }

            if(/(mpe?g|mp4)$/i.test(animation)) {
              return (
                <chakra.video
                  {...props}
                  controls autoPlay loop muted
                >
                  <chakra.source src={url}/>
                </chakra.video>
              )
            } else if(/(glb|gltf)$/i.test(animation)) {
              return (
                <Text textAlign="center">
                  3D Support Coming Soon
                </Text>
              )
            } else {
              return (
                <chakra.object
                  data={url}
                  title={name}
                  pointerEvents="none"
                  bg={`#${bg}`}
                  borderRadius={15}
                  p={2}
                  {...props}
                />
              )
            }
          })()
        )}
      </Stack>
    )
  }
)

export const ViewPage = () => {
  const { nftId } = useParams() 
  const tokenId = deregexify(
    Array.isArray(nftId) ? nftId[0] : nftId
  )

  return <View {...{ tokenId }}/>
}

export default ViewPage