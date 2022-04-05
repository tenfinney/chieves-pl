import { NextPage } from 'next'
import { Button, ButtonProps, Container, Flex, FormControl, FormLabel, Input, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { URIForm, JSONForm, NFTForm } from 'components/forms'
import { capitalize, switchTo } from 'lib/helpers'
import { NETWORKS } from 'lib/networks'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { useWeb3 } from 'lib/hooks'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import pluralize from 'pluralize'
import { CodedError, ERC1155Metadata } from 'lib/types'

const Submit: React.FC<ButtonProps & {
  purpose: string
  processing?: boolean
}> = ({ purpose, processing = false, onClick, ...props }) => {
  const { chain, isMetaMask, userProvider, connect } = useWeb3()
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
      colorScheme="green"
      isDisabled={
        ((offChain && !isMetaMask) && !!userProvider)
        || processing || working
      }
      w="full"
      onClick={async (...args) => {
        setWorking(true)

        if (!userProvider) {
          connect()
        } else if (offChain) {
          switchTo(NETWORKS.contract.chainId)
        } else {
          onClick?.apply(this, args)
        }

        setWorking(false)
      }}
      {...props}
    >
      {(() => {
        if (processing || working) {
          return (
            <Flex>
              <Spinner/>
              <Text ml={2}>
                {capitalize(purpose).slice(0, -1)}ing…
              </Text>
            </Flex>
          )
        } else if (!userProvider) {
          return 'Connect To Continue'
        } else if (offChain) {
          return `Connect to the ${desiredNetwork} network.`
        } else {
          return `${capitalize(purpose)} NFT`
        }
      })()}
    </Button>
  )
}

export const OptionsForm: React.FC<{
  purpose?: 'create' | 'update'
  tokenId: string
  metadata: ERC1155Metadata
}> = ({
  purpose = 'create', tokenId, metadata
}) => {
  const { roContract, rwContract, ensProvider } = useWeb3()
  const router = useRouter()
  const {
    register, handleSubmit, watch, setValue,
    formState: {
      errors, isSubmitting: processing, isDirty: dirty,
    },
  } = useForm()
  const FIELD_FORM = 0
  const URI_FORM = 1
  const [tab, setTab] = useState(FIELD_FORM)
  const creating = purpose === 'create'

  const mint = useCallback(async ({ metadata, max = 0 }) => {
    // try {
    //   if(!rwContract) {
    //     throw new Error(`Cannot connect to contract to ${purpose} metadata.`)
    //   }

    //   if(!info) {
    //     const tokenId = (creating ? (

    //     ) router.query.nftId as string
    //     await rwContract.setURI(metadata, Number(tokenId))
  
    //   }

    //   if(creating) {
    //     const { quantity, treasurer } = info
    //     const enact = (
    //       window.confirm(
    //         `¿Mint ${quantity} ${pluralize('token', quantity)} to ${treasurer}?`
    //       )
    //     )
    //     if(!enact) {
    //       throw new Error('User denied mint operation.')
    //     }

    //     const address = await ensProvider?.resolveName(treasurer)
    //     if (!address) {
    //       throw new Error(`Couldn't resolve ENS name: “${treasurer}”`)
    //     }

    //     const tokenId = (
    //       await rwContract['mint(address,uint256,string,bytes)'](
    //         address, quantity, metadata, []
    //       )
    //     )
    //     return router.push(`/view/${tokenId}`)
    //   }

    //   if(purpose !== 'update') {
    //     throw new Error(`Unknown Purpose: “${purpose}”`)
    //   }
    // } catch (err) {
    //   toast({
    //     title: 'Contract Error',
    //     description: (err as Error).message,
    //     status: 'error',
    //     isClosable: true,
    //     duration: 10000
    //   })
    // }
  }, [])

  // const buildMeta = (data) => {
  //   if(data.)
  // }

  const submit = async (data: Record<string, unknown>) => {
    console.info({ data })
    // const metadata: ERC1155Metadata = {
    //   name: name ?? 'Untitled', description, decimals: 0,
    // }

    // if (!!homepage) {
    //   metadata.external_url = homepage
    // }

    // if (Array.isArray(images)) {
    //   metadata.image = await ipfsify(images)
    // } else if (images != null) {
    //   console.warn(`Unknown Image Type: ${typeof images}`)
    // }

    // if (animation instanceof File || typeof animation === 'string') {
    //   metadata.animation_url = await ipfsify(animation)
    // } else if (animation !== undefined) {
    //   console.warn(`Unknown Animation Type: ${typeof animation}`)
    // }

    // if (color.startsWith('#')) {
    //   metadata.background_color = (
    //     color.substring(1).toUpperCase()
    //   )
    // }

    // metadata.properties = {}

    // if (Object.keys(wearables).length > 0) {
    //   metadata.properties.wearables = (
    //     Object.fromEntries(
    //       await Promise.all(
    //         Object.entries(wearables).map(
    //           async ([type, value]) => (
    //             [type, await ipfsify(value as string | File)]
    //           )
    //         )
    //       )
    //     )
    //   )
    // }

    // if (attributes.length > 0) {
    //   metadata.attributes = (
    //     attributes.map(({ name, value, type }) => {
    //       const attr: Attribute = {
    //         trait_type: name,
    //         value,
    //       }
    //       // including a string type causes nothing to render
    //       if (type !== 'string') {
    //         attr.display_type = type
    //       }
    //       return attr
    //     })
    //   )
    // }

    // const dataURI = await ipfsify({
    //   name: `metadata.${(new Date()).toISOString()}.json`,
    //   content: JSON.stringify(metadata, null, 2),
    // })

    // await enact(dataURI)
  }

  return (
    <Container
      as="form" onSubmit={handleSubmit(submit)}
      mt={10} mb="20rem" maxW={['100%', 'min(85vw, 50em)']}
      sx={{ a: { textDecoration: 'underline' } }}
    >
      <Submit {...{ purpose, processing }} mb={3} />
      <Tabs ml={5} isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Fields</Tab>
          <Tab>URI</Tab>
          <Tab>JSON5</Tab>
        </TabList>
        <TabPanels>
          {[NFTForm, URIForm, JSONForm].map((Form) => (
            <TabPanel key={Form.displayName}>
              <Form {...{
                register,
                watch,
                setValue,
                tokenId,
                metadata,
              }}/>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <FormControl isRequired>
        <Flex align="center">
          <FormLabel>Maximum Mintable</FormLabel>
          <Input
            type="number"
            placeholder="¿Maximum number of tokens allowed?"
            {...register('maximum')}
          />
        </Flex>
      </FormControl>
      <Submit {...{ purpose, processing }} mb={3} />
    </Container>
  )
}

export default OptionsForm