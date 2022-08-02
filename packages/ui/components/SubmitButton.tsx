import { capitalize, switchTo } from '@/lib/helpers'
import { NETWORKS } from '@/lib/networks'
import {
  Button, ButtonProps, Flex, Spinner, Text,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useWeb3 } from '@/lib/hooks'

export const SubmitButton: React.FC<ButtonProps & {
  purpose: string
  processing?: boolean
  label?: string
}> = ({
  purpose,
  processing = false,
  onClick,
  label = `${capitalize(purpose)} NFT`,
  ...props
}) => {
  const {
    chain, isMetaMask, userProvider, connect, rwContract,
  } = useWeb3()
  const offChain = useMemo(
    () => chain !== NETWORKS.contract.chainId,
    [chain],
  )
  const [working, setWorking] = useState(processing)
  const desiredNetwork = (
    offChain ? NETWORKS.contract.name : null
  )

  return (
    <Button
      type="submit"
      variant="solid"
      colorScheme={
        (!rwContract || offChain) ? 'blue' : 'green'
      }
      isDisabled={
        ((offChain && !isMetaMask) && !!rwContract)
        || processing || working
      }
      w="full"
      onClick={async (evt) => {
        setWorking(true)

        if(!userProvider) {
          evt.preventDefault()
          connect()
        } else if(offChain) {
          evt.preventDefault()
          switchTo(NETWORKS.contract.chainId)
        } else {
          onClick?.apply(this, [evt])
        }

        setWorking(false)
      }}
      {...props}
    >
      {(() => {
        if(processing || working) {
          return (
            <Flex>
              <Spinner/>
              <Text ml={2}>
                {capitalize(purpose).slice(0, -1)}ing…
              </Text>
            </Flex>
          )
        } else if(!userProvider) {
          return 'Connect To Continue'
        } else if(offChain) {
          return `Connect To The ${desiredNetwork} Network`
        } else if(!rwContract) {
          return 'Contract Not Connected'
        } else {
          return label
        }
      })()}
    </Button>
  )
}
