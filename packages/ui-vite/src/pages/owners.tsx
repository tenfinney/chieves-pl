import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import {
  Box, Heading, ListItem, OrderedList, Link as ChakraLink, Text
} from '@chakra-ui/react'
import { useWeb3 } from 'lib/hooks'
import { useEffect, useState } from 'react'
import { httpURL } from 'lib/helpers'
import { HomeLink } from 'components'
import contractAddress from 'contracts/polygon/BulkDisbursableNFTs.address'

const LIMIT = 100
const NFT_OWNERS = gql`
  query NFTOwners(
    $tokenId: String
    $contractAddress: String
    $startAfter: String
  ) {
    nfts(where:{ 
      contract: $contractAddress,
      tokenID: $tokenId
    }) {
      ownership(where: {
        id_gt: $startAfter
      }) {
        id
        owner
        quantity
      }
    }
  }
`

export type Ownership = {
  id: string
  owner: string
  quantity: number
}

export const Owners = () => {
  const { query } = useRouter()
  let { nftId } = query
  const { start_after: startAfter = '', offset = 0 } = query

  const [ownerships, setOwnerships] = (
    useState<Array<Ownership>>([])
  )
  console.debug({nftId, startAfter })
  if(Array.isArray(nftId)) {
    nftId = nftId[0]
  }
  const decId = nftId ? BigInt(nftId).toString() : null
  const { loading, error, data } = useQuery(
    NFT_OWNERS,
    { variables: {
      tokenId: decId,
      contractAddress: contractAddress.toLowerCase(),
      startAfter,
    } },
  )
  const [title, setTitle] = useState('𝘜𝘯𝘬𝘯𝘰𝘸𝘯')
  const { ensProvider, roContract } = useWeb3()
  console.debug({loading, error, data})
  
  useEffect(() => {
    const lookup = async () => {
      if(nftId) {
        const uri = await roContract?.uri(nftId)
        if(!uri) return
        const response = await fetch(httpURL(uri)!)
        const data = await response.json()
        setTitle(data.name)
      }
    }
    lookup()
  }, [nftId, roContract])

  useEffect(() => {
    const process = async () => {
      if(data) {
        if(data.nfts.length > 1 ) {
          throw new Error(`Got ${data.nfts.length} NFTs`)
        }
        if (data.nfts.length === 1) {
          setOwnerships(
            await Promise.all(
              data.nfts[0].ownership.map(
                async (oship: Ownership) => {
                  let { owner } = oship
                  const ens = (
                    await ensProvider?.lookupAddress(owner)
                  )
                  if (ens) {
                    owner = ens 
                  }
                  return {
                    owner, quantity: oship.quantity, id: oship.id,
                  }
                }  
              )
            )
          )
        }
      }
    }
    process()
  }, [data, ensProvider])
  if (loading) return 'Loading…'
  if (error) return `Error! ${error.message}`
  return (
    <Box ml={8}>
      <HomeLink/>
      <Heading mt={10} fontSize={20}>
        {title}
      </Heading>
      {ownerships.length === 0 ? (
        <Text>
          Could not find an NFT with id {nftId}. 
        </Text>
      ) : (
        <OrderedList start={Number(offset) + 1}>
          {ownerships.map((ownership, idx) => (
            <ListItem key={idx} ml={6}>
              {`${ownership.owner} (${ownership.quantity})`}
            </ListItem>
          ))}
        </OrderedList>
      )}
      {ownerships.length === LIMIT && (
        <Link
          href={{
            pathname: '/owners',
            query: {
              nftId,
              start_after: ownerships.slice(-1)[0].id,
              offset: Number(offset) + LIMIT,
            },
          }}
          passHref
        >
          <ChakraLink>Next</ChakraLink>
        </Link>
      )}
    </Box>
  )
}

export default Owners