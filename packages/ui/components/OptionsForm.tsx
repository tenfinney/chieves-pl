import {
  Box,
  Button, ButtonProps, Flex, Spinner, Stack,
  Tab, TabList, TabPanel,
  TabPanels, Tabs, Text, useToast,
} from '@chakra-ui/react'
import { URIForm, JSONForm, NFTForm } from 'components/forms'
import { capitalize, ipfsify, isSet, switchTo } from 'lib/helpers'
import { useCallback, useState } from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import JSON5 from 'json5'
import {
  ERC1155Metadata, FormValues, Maybe, OpenSeaAttribute, Attribute,
} from '@/lib/types'
import { isEmpty, regexify, extractMessage } from '@/lib/helpers'
import { MaxForm } from './MaxForm'
import { SubmitButton } from './SubmitButton'

export const OptionsForm: React.FC<{
  purpose?: 'create' | 'update'
  tokenId?: string
  metadata?: Maybe<ERC1155Metadata>
}> = ({
  purpose = 'create', tokenId, metadata
}) => {
  const { rwContract } = useWeb3()
  const router = useRouter()
  const {
    register, handleSubmit, watch, setValue,
    formState: {
      errors, isSubmitting: processing, isDirty: dirty,
    },
  } = useForm()
  const FIELD_FORM = 0
  const URI_FORM = 1
  const JSON5_FORM = 2
  const [tab, setTab] = useState(FIELD_FORM)
  const toast = useToast()

  const configure = useCallback(
    async ({ metadata }) => {
      if(!rwContract) {
        throw new Error(
          `Cannot connect to contract to ${purpose} metadata.`
        )
      }
      if(tokenId == null) {
        throw new Error('Token id is unset.')
      }

      if(tokenId != null) {
        const tx = await rwContract.setURI(
          BigInt(tokenId), metadata
        )
        await tx.wait()
      }
          
      return router.push(`/view/${regexify(tokenId)}`)
    },
    [purpose, router, rwContract, tokenId],
  )

  const buildMeta = async (data: FormValues) => {
    const {
      name, description, homepage, color,
      images, animation, attributes,
    } = data

    const metadata: ERC1155Metadata = {
      name: isSet(name) ? name : '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙',
      decimals: 0,
    }

    if(isSet(description)) {
      metadata.description = description
    }

    if(isSet(homepage)) {
      metadata.external_url = homepage
    }

    if(Array.isArray(images)) {
      metadata.image = (await ipfsify(images))[0] // wrong
    } else if (images != null) {
      console.warn(`Unknown Image Type: ${typeof images}`)
    }

    if(animation instanceof File || typeof animation === 'string') {
      metadata.animation_url = (await ipfsify(animation))[0]
    } else if (animation != null) {
      console.warn(`Unknown Animation Type: ${typeof animation}`)
    }

    if(color?.startsWith('#')) {
      metadata.background_color = (
        color.substring(1).toUpperCase()
      )
    }

    if(isSet(attributes) && !isEmpty(attributes)) {
      metadata.attributes = (
        attributes.map(({ name, value, type }: Attribute) => {
          const attr: OpenSeaAttribute = {
            trait_type: name,
            value,
          }
          // including a string type causes nothing to render
          if (type !== 'string') {
            attr.display_type = type
          }
          return attr
        })
      )
    }

    return metadata
  }

  const submit = async (data: FormValues) => {
    try {
      const name = `metadata.${(new Date()).toISOString()}.json`
      let metadata = await (async () => {
        switch(tab) {
          case FIELD_FORM: {
            return {
              name,
              content: JSON.stringify(
                await buildMeta(data), null, 2
              )
            }
          }
          case URI_FORM: {
            return data.uri
          }
          case JSON5_FORM: {
            if(!isSet(data.json5)) {
              throw new Error('JSON5 isn’t set.')
            }
            return {
              name,
              content: JSON.stringify(
                JSON5.parse(data.json5), null, 2
              )
            }
          }
          default: {
            throw new Error(`Unknown Tab: ${tab}`)
          }
        }
      })()

      if(!metadata) {
        throw new Error('Metadata is undefined.')
      }
      [metadata] = await ipfsify(metadata)
      await configure({ metadata })
    } catch(error) {
      toast({
        title: 'Metadata Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
      console.debug((error as Error).stack)
    }
  }
    
  return (
    <Stack align="center">
      <Box
        as="form" onSubmit={handleSubmit(submit)}
        mt={10} w={['100%', 'min(85vw, 40em)']}
        sx={{ a: { textDecoration: 'underline' } }}
      >
        <SubmitButton {...{ purpose, processing }} mb={3} />
        <Tabs
          mx={[0, 5]}
          isFitted
          variant="enclosed"
          onChange={(idx) => setTab(idx)}
        >
          <TabList mb="1em">
            <Tab>Fields</Tab>
            <Tab>URI</Tab>
            <Tab>JSON5</Tab>
          </TabList>
          <TabPanels>
            {[NFTForm, URIForm, JSONForm].map((Form, idx) => (
              <TabPanel key={idx} p={0}>
                <Form {...{
                  register,
                  watch,
                  setValue,
                  tokenId,
                  metadata,
                }} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <SubmitButton {...{ purpose, processing }} mb={3} />
      </Box>
      <MaxForm colorScheme="blue" {...{ tokenId, purpose }}/>
    </Stack>
  )
}

export default OptionsForm