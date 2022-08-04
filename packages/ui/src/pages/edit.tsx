import { useWeb3 } from '@/lib/hooks'
import { ReactNode, useEffect, useState } from 'react'
import { ERC1155Metadata, Maybe } from '@/lib/types'
import { httpURL, regexify } from '@/lib/helpers'
import { HomeLink, OptionsForm } from '@/components'
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export const Edit = () => {
  let { nftId: tokenId } = useParams() 
  const [metadata, setMetadata] = useState<Maybe<ERC1155Metadata>>()
  const [error, setError] = useState<ReactNode>()
  const { roContract } = useWeb3()

  useEffect(() => {
    const getMetadata = async () => {
      if(roContract && tokenId) {
        try {
          const meta = await roContract.uri(tokenId)
          if(!meta) {
            setMetadata(null)
          } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const response = await fetch(httpURL(meta)!)
            setMetadata(await response.json())
          }
        } catch(err) {
          setError((err as Error).message)
        }
      }
    }

    getMetadata()
  }, [roContract, tokenId])

  return (
    <Box ml={16}>
      <Helmet>
        <title>’𝖈𝖍𝖎𝖊𝖛𝖊: ℰ𝒹𝒾𝓉 #{tokenId && regexify(tokenId)}</title>
      </Helmet>
      <HomeLink/>
      <OptionsForm
        purpose="update"
        {...{ tokenId, metadata }}
      />
    </Box>
  )
}

export default Edit