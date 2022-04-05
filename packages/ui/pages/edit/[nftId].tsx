import { useWeb3 } from 'lib/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { ERC1155Metadata, Maybe } from 'lib/types';
import { httpURL } from 'lib/helpers'
import { OptionsForm } from 'components'

export const Edit: NextPage = () => {
  const { query: { nftId } } = useRouter()
  const [metadata, setMetadata] = useState<Maybe<ERC1155Metadata>>()
  const [error, setError] = useState<ReactNode>()
  const tokenId = `0x${Number(nftId).toString(16)}`
  const { roContract } = useWeb3()

  useEffect(() => {
    const getMetadata = async () => {
      if(roContract && tokenId) {
        try {
          const meta = await roContract.uri(tokenId)
          if(!meta) {
            setMetadata(null)
          } else {
            const response = await fetch(httpURL(meta))
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
    <OptionsForm
      purpose="update"
      {...{ tokenId, metadata }}
    />
  )
}

export default Edit