import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { Box, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import { useWeb3 } from 'lib/hooks'
import { useEffect, useState } from 'react'
import { httpURL } from 'lib/helpers'

const NFT_OWNERS = gql`
  query NFTOwners($tokenId: String) {
    nfts(where:{ 
      contract: "0x2fd05e332fcb602772337a5684b189f26a92cfab",
      tokenID: $tokenId
    }) {
      ownership {
        owner
        quantity
      }
    }
  }
`

export type Ownership = {
  owner: string
  quantity: number
}

export const Owners = () => {
  let { query: { nftId } } = useRouter()
  const [ownerships, setOwnerships] = (
    useState<Array<Ownership>>([])
  )
  console.debug({nftId})
  if(Array.isArray(nftId)) {
    nftId = nftId[0]
  }
  const decId = nftId ? BigInt(nftId).toString() : null
  const { loading, error, data } = useQuery(
    NFT_OWNERS,
    { variables: { tokenId: decId } },
  )
  const [title, setTitle] = useState('𝘜𝘯𝘬𝘯𝘰𝘸𝘯')
  const { ensProvider, roContract } = useWeb3()
  console.debug({loading, error, data})
  
  useEffect(() => {
    const lookup = async () => {
      if(nftId) {
        const uri = await roContract?.uri(nftId)
        const response = await fetch(httpURL(uri))
        const data = await response.json()
        console.debug({data})
        setTitle(data.name)
      }
    }
    lookup()
  }, [roContract])

  useEffect(() => {
    const process = async () => {
      if(data) {
        if(data.nfts.length !== 1) {
          throw new Error(`Got ${data.nfts.length} NFTs`)
        }
        setOwnerships(
          await Promise.all(
            data.nfts[0].ownership.map(
              async (oship: Ownership) => {
                let { owner } = oship
                if(owner.includes('.')) {
                  owner = (
                    await ensProvider?.lookupAddress(owner)
                  ) ?? 'Unknown'
                }
                return {
                  owner, quantity: oship.quantity,
                }
              }  
            )
          )
        )
      }
    }
    process()
  }, [data])
  if (loading) return 'Loading…'
  if (error) return `Error! ${error.message}`
  return (
    <Box>
      <Heading mt={10} ml={4} fontSize={20}>
        {title}
      </Heading>
      <OrderedList>
        {ownerships.map((ownership, idx) => (
          <ListItem key={idx} ml={6}>
            {console.debug({ownership})}
            {`${ownership.owner} (${ownership.quantity})`}
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default Owners