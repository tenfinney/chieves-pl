import React, { useCallback, useState } from 'react'
import { deregexify, extractMessage, regexify } from '@/lib/helpers'
import { useParams } from 'react-router-dom'
import { View } from './view'
import { Container, Stack, useToast } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { SubmitButton } from '@/components'
import { useWeb3 } from '@/lib/hooks'

export const SelfMint: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  const { rwContract, address } = useWeb3()
  const [processing, setProcessing] = useState(false)
  const toast = useToast()

  const mint = useCallback(async () => {
    try {
      setProcessing(true)
      const tx = await (
        rwContract['mint(address[],uint256,bytes)'](
          [address], BigInt(tokenId), []
        )
      )
      await tx.wait()
    } catch(error) {
      console.error({ error })
      toast({
        title: 'Minting Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    } finally {
      setProcessing(false)
    }
  }, [address, rwContract, toast, tokenId])

  return (
    <Container maxW="40rem" my={10}>
      <Helmet>
        <title>Self-Mint NFT #{regexify(tokenId)}</title>
        <meta name="description" content="Mint a ’Chievemint NFT" />
      </Helmet>


      <Stack as="form" onSubmit={mint}>
        <SubmitButton purpose="mint" {...{ processing }}/>
        <View {...{ tokenId }} header={false}/>
        <SubmitButton purpose="mint" {...{ processing }}/>
      </Stack>
    </Container>
  )
}

export const SelfMintPage = () => {
  const { nftId } = useParams() 
  const tokenId = deregexify(
    Array.isArray(nftId) ? nftId[0] : nftId
  )

  return <SelfMint {...{ tokenId }}/>
}

export default SelfMintPage