import { capitalize, switchTo } from '@/lib/helpers'
import { NETWORKS } from '@/lib/networks'
import {
  Button, ButtonProps, Flex, Link, Spinner, Text,
} from '@chakra-ui/react'
import React, { MouseEvent, useMemo, useState } from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useConfig } from '@/config'

export const SubmitButton: React.FC<ButtonProps & {
  purpose?: string
  processing?: boolean
  label?: string
  requireStorage?: boolean
}> = ({
  purpose = 'create',
  processing = false,
  onClick,
  requireStorage,
  label = `${capitalize(purpose)} NFT`,
  ...props
}) => {
  const {
    chain, userProvider, connect, rwContract,
  } = useWeb3()
  const offChain = useMemo(
    () => chain !== NETWORKS.contract.chainId,
    [chain],
  )
  const [working, setWorking] = useState(processing)
  const desiredNetwork = (
    offChain ? NETWORKS.contract.name : null
  )
  const { Settings, storage } = useConfig({ requireStorage })

  return <>
    {(rwContract && requireStorage && !storage) && (
      <Settings highlight={['nftStorageAPIToken']}/>
    )}
    <Button
      type="submit"
      variant="solid"
      colorScheme={
        (!rwContract || offChain) ? 'blue' : 'green'
      }
      isDisabled={
        (offChain && !!rwContract) || processing || working
      }
      w="full"
      onClick={async (evt: MouseEvent<HTMLButtonElement>) => {
        try {
          setWorking(true)

          if(!userProvider) {
            evt.preventDefault()
            connect()
          } else if(offChain) {
            evt.preventDefault()
            switchTo(NETWORKS.contract.chainId)
          } else {
            onClick?.apply(null, [evt])
          }
        } finally {
          setWorking(false)
        }
      }}
      {...props}
    >
      {(() => {
        if(processing || working) {
          return (
            <Flex>
              <Spinner/>
              <Text ml={2}>
                {capitalize(purpose).replace(/e$/, '')}ing…
              </Text>
            </Flex>
          )
        } else if(!userProvider) {
          return `Connect To ${capitalize(purpose)}`
        } else if(offChain) {
          return `Connect To The ${desiredNetwork} Network To ${capitalize(purpose)}`
        } else if(!rwContract) {
          return 'Contract Not Connected'
        } else if(requireStorage && !storage) {
          return <>
            Missing
            <Link mx={1} target="_blank" href="//nft.storage">
              NFT.Storage
            </Link>
            Token
          </>
        } else {
          return label
        }
      })()}
    </Button>
  </>
}
