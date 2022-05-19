import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { ListItem, OrderedList } from '@chakra-ui/react'

const NFT_OWNERS = gql`
  query NFTOwners {
    nfts(where:{ contract: "0x2fd05e332fcb602772337a5684b189f26a92cfab" }) {
      contract {
        id
    }
      ownership {
        id
        owner
        quantity
      }
    }
  }
`
export const Owners = () => {
  const { query: { nftId } } = useRouter()
  const { loading, error, data } = useQuery(NFT_OWNERS)
  console.debug({loading, error, data})
  if (loading) return 'Loading…'
  if (error) return `Error! ${error.message}`
  return (
    <OrderedList>
      {data.nfts.map(({ ownership }) => {
        console.debug({ownership})
      return (
        <ListItem>
          {`${ownership.owner} (${ownership.quantity})`}
        </ListItem>
      )
      })}
    </OrderedList>
  )
}

export default Owners