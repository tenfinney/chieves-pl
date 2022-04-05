import { AddIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Input, chakra, Select, Td, Tooltip, Button, useToast, useDisclosure, Tr, Container, UnorderedList, ListItem, FormControl, Flex, FormLabel, Box, Text, Link, Image, Tabs, TabList, Tab, TabPanels, TabPanel, Textarea, Table, Thead, Th, Tbody, ModalFooter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, ButtonProps, Radio, RadioGroup, SimpleGrid } from '@chakra-ui/react'
import CONFIG from 'config'
import { NFT_HOMEPAGE_BASE } from 'lib/constants'
import { capitalize, httpURL, isEmpty } from 'lib/helpers'
import { useWeb3 } from 'lib/hooks'
import { NETWORKS } from 'lib/networks'
import { Attribute, ERC1155Metadata, Maybe } from 'lib/types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import all from 'it-all'
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type AttrProps = {
  name?: string
  value?: string | number
  type?: string
}

const AttrRow: React.FC<{
  attributes: Array<AttrProps>
  setAttributes: (
    React.Dispatch<React.SetStateAction<Array<AttrProps>>>
  )
  index: number
}> = ({ attributes, setAttributes, index }) => {
  const { name = '', value = '', type = 'string' } = (
    attributes[index]
  )
  const setter = useCallback(
    (prop: string) => (
      (value: string | number) => setAttributes(
        (attrs: Array<AttrProps>) => ([
          ...attrs.slice(0, index),
          { ...attrs[index], [prop]: value },
          ...attrs.slice(index + 1)
        ])
      )
    ), [setAttributes, index]
  )
  const setName = setter('name')
  const setValue = setter('value')
  const setType = setter('type')

  return (
    <Tr>
      <Td><Input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      /></Td>
      <Td>{(() => {
        switch (type) {
          case 'date': {
            return (
              <Input
                type="date"
                value={isEmpty(value) ? (
                  ''
                ) : (
                  (new Date(value)).toISOString().split('T')[0]
                )}
                onChange={({ target: { value } }) => (
                  setValue((new Date(value)).getTime())
                )}
              />
            )
          }
          case 'string': {
            return (
              <Input
                {...{ value }}
                onChange={({ target: { value } }) => (
                  setValue(value)
                )}
              />
            )
          }
          default: {
            return (
              <Input
                type="number"
                {...{ value }}
                onChange={({ target: { value } }) => (
                  setValue(value != null ? Number(value) : '')
                )}
              />
            )
          }
        }
      })()}</Td>
      <Td>
        <Select
          value={type}
          onChange={({ target: { value } }) => setType(value)}
        >
          <chakra.option value="string">String</chakra.option>
          <chakra.option value="date">Date</chakra.option>
          <chakra.option value="number">Number</chakra.option>
          <chakra.option value="boost_percentage">
            Boost Percentage
          </chakra.option>
          <chakra.option value="boost_number">
            Boost Number
          </chakra.option>
        </Select>
      </Td>
      <Td><Tooltip label="Remove" hasArrow>
        <Button
          size="sm" ml={2}
          onClick={() => setAttributes(
            (attrs) => ([
              ...attrs.slice(0, index),
              ...attrs.slice(index + 1)
            ])
          )}
        >
          <CloseIcon />
        </Button>
      </Tooltip></Td>
    </Tr>
  )
}

const Anchor = ({ name }: { name: string }) => {
  const anchor = name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link
      id={anchor}
      href={`#${anchor}`}
      style={{ textDecoration: 'none' }}
      tabIndex={-1}
    >
      <chakra.span role="img" aria-label="Link">🔗</chakra.span>
    </Link>
  )
}

const Label = ({ name }: { name: string }) => (
  <Flex ml="-2.75em" mt={-1.5}>
    <Anchor {...{ name }} />
    <Text ml={3} mr={2}>■</Text>
    <FormLabel whiteSpace="pre">{name}:</FormLabel>
  </Flex>
)

const ExpandShow: React.FC<{
  name: string, button?: Maybe<ReactNode>
}> = ({ name, button = null, children }) => {
  const [hide, setHide] = useState<Record<string, boolean>>({})
  const toggle = useCallback((prop) => {
    setHide(h => ({ ...h, [prop]: !h[prop] }))
  }, [])
  const box = useRef<HTMLDivElement>(null)

  return (
    <Box ref={box}>
      <Flex ml="-3em" mt={3} align="center">
        <Anchor {...{ name, box }} />
        <Text
          ml={3}
          cursor={hide[name] ? 'zoom-in' : 'zoom-out'}
          onClick={() => toggle(name)}
        >
          {hide[name] ? '▸' : '▾'}
          {` ${name}:`}
        </Text>
        {!hide[name] && button}
      </Flex>
      {!hide[name] && children}
    </Box>
  )
}

type NamedString = {
  name: string
  content: string
}

type ModelProps = {
  isOpen: boolean
  onClose: () => void
  setWearables: (
    React.Dispatch<React.SetStateAction<
      Record<string, string>
    >>
  )
}

const ModelModal: React.FC<ModelProps> = ({
  isOpen, onClose, setWearables,
}) => {
  const [type, setType] = useState('model/gltf-binary')
  const [specifiedType, setSpecifiedType] = useState('')
  const addModel = (type: string, file: string) => {
    setWearables((ws) => {
      if (!ws[type] || window.confirm(`¿Replace ${type}?`)) {
        return { ...ws, [type]: file }
      } else {
        return ws
      }
    })
  }

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent
        onSubmit={(evt: FormEvent) => {
          evt.preventDefault()
          evt.stopPropagation()
          addModel(
            type !== 'other' ? type : specifiedType,
            (evt.target as HTMLFormElement)['file'].files[0],
          )
          onClose()
        }}
        as="form"
      >
        <ModalHeader>Add Model</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="mimetype">
            <FormLabel>Model Type:</FormLabel>
            <Select
              ml={5} w="calc(100% - 2rem)"
              value={type}
              onChange={({ target: { value } }) => setType(value)}
            >
              <chakra.optgroup style={{ padding: 0 }}>
                <chakra.option value="model/gltf-binary">Binary glTF</chakra.option>
                <chakra.option value="model/gltf+json">glTF</chakra.option>
                <chakra.option value="model/fbx">FBX</chakra.option>
                <chakra.option value="application/x-blender">Blender</chakra.option>
                <chakra.option value="model/vox">VOX</chakra.option>
                <chakra.option value="model/vrm">VRM</chakra.option>
              </chakra.optgroup>
              <chakra.optgroup>
                <chakra.option value="other" fontStyle="italic">
                  Other
                </chakra.option>
              </chakra.optgroup>
            </Select>
            {type === 'other' && (
              <Input
                ml={5} mt={3} w="calc(100% - 2rem)" placeholder="Mime Type"
                required={true} value={specifiedType}
                onChange={({ target: { value } }) => (
                  setSpecifiedType(value)
                )}
              />
            )}
          </FormControl>
          <FormControl id="model" mt={5}>
            <FormLabel>Model File:</FormLabel>
            <Input
              id="file" required={true} type="file"
              ml={5} w="calc(100% - 2rem)" h="auto"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" ml={3} type="submit">
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const NFTForm: React.FC<{
  purpose?: 'create' | 'update'
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  tokenId: string
  metadata?: Maybe<ERC1155Metadata>
}> = ({
  purpose = 'create',
  register,
  watch,
  setValue,
  tokenId = '𝘜𝘯𝘬𝘯𝘰𝘸𝘯',
  metadata,
}) => {
    const [images, setImages] = useState<Maybe<Array<File | string>>>()
    const [primaryImageIdx, setPrimaryImageIdx] = useState(0)
    const imageRef = useRef<HTMLInputElement>(null)
    const { homepage, description, color } = watch()
    const [animation, setAnimation] = useState<Maybe<File | string>>()
    const [wearables, setWearables] = useState({})
    const [attributes, setAttributes] = (
      useState<Array<AttrProps>>([])
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const setImage = useCallback((file) => setImages([file]), [])

    useEffect(() => {
      if (metadata) {
        Object.entries({
          name: null, description: null,
          external_url: 'homepage',
          animation_url: 'animation',
        })
        .forEach(([prop, name]) => {
          setValue(name ?? prop, metadata[prop])
        })

        const { attributes: attrs } = metadata
        if(!isEmpty(attrs)) {
          setAttributes((attrs ?? []).map(({
            trait_type: name, value,
            display_type: type = 'string',
          }: Attribute) => ({ name, value, type })))
        }

        setWearables(metadata.properties?.wearables ?? {})

        const bg = metadata.background_color
        if(bg && !isEmpty(bg)) {
          setValue('color', `#${bg}`)
        }
      }
    }, [metadata, setImage, setValue])

    useEffect(() => {
      setValue('homepage', `${NFT_HOMEPAGE_BASE}/${tokenId}`)
    }, [setValue, tokenId])

    useEffect(() => {
      if (window.location.hash) {
        const elem = document.getElementById(
          window.location.hash.substring(1)
        )
        window.scroll({
          top: (elem?.offsetTop ?? 0) - 120,
          behavior: 'smooth',
        })
      }
    }, [])

    const configImage = ({ target: { files } }: { target: { files: Maybe<FileList> } }) => {
      if (files?.length && files?.length >= 1) {
        setPrimaryImageIdx(0)
        setImages(Array.from(files))
      }
    }

    const configAnimation = (
      (evt: ChangeEvent & { target: { files: Maybe<FileList> } }) => {
        const { target: { files } } = evt
        if (files?.length === 1) {
          setAnimation(files[0])
        } else {
          setAnimation(null)
        }
        evt.preventDefault()
      }
    )

    const addRow = () => {
      setAttributes(attrs => [...attrs, {}])
    }

    type Fileish = File | string | Array<File | string> | NamedString

    const ipfsify = async (filesOrURL: Fileish) => {
      let value = filesOrURL
      if (Array.isArray(value) && typeof value[0] === 'string') {
        const count = value.length
        if (count !== 1) {
          throw new Error(
            `Unexpected ${count} entries in string array`
            + ' passed to ipfsify.'
          )
        }
        value = value[0]
      }

      if (typeof value === 'string') {
        if (value.startsWith('ipfs://')) {
          return value
        }
        throw new Error(`Unknown File String: ${value}`)
      }

      const list: Array<File | NamedString> = (
        Array.isArray(value) ? (
          value as Array<File | NamedString>
        ) : (
          [value as File | NamedString]
        )
      )

      const result = await all(CONFIG.ipfs.addAll(
        list.map((entry) => ({
          path: entry.name,
          content: (entry as NamedString).content ?? entry 
        })),
        { pin: true, wrapWithDirectory: true }
      ))
      const [{ cid }] = result.slice(-1)
      console.debug({ list, cid, result })
      return (
        `ipfs://${cid.toString()}/`
        + encodeURIComponent((list[primaryImageIdx] as File).name)
      )
    }

    return (
      <UnorderedList listStyleType="none">
        <ListItem>
          <FormControl mt={3}>
            <Flex align="center">
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                {...register('name')}
              />
            </Flex>
          </FormControl>
        </ListItem>
        <ListItem>
          <ExpandShow name="Image">
            <Box m={3}>
              <Input
                type="file" accept="image/*"
                ref={imageRef} onChange={configImage}
                display={images ? 'none' : 'inherit'}
                h="auto"
                multiple
              />
              {images?.length && (
                <RadioGroup
                  value={primaryImageIdx}
                  onChange={(value) => {
                    setPrimaryImageIdx(Number(value))
                  }}
                >
                  <SimpleGrid columns={2} templateColumns="6rem 1fr">
                    {images.map((image, idx) => {
                      const name = (
                        image instanceof File ? (
                          image.name
                        ) : (
                          image.replace(/^.*\//g, '')
                        )
                      )

                      return (
                        <React.Fragment key={idx}>
                          <Flex w={16}>
                            <Radio value={idx}>Display Image</Radio>
                          </Flex>
                          <Flex
                            justify="center"
                            bg={idx === primaryImageIdx ? color : 'transparent'}
                          >
                            <Tooltip label={name} hasArrow>
                              <Image
                                alt={name}
                                src={
                                  (image instanceof File) ? (
                                    URL.createObjectURL(image)
                                  ) : (
                                    httpURL(image)
                                  )
                                }
                                maxH={60} mt={0}
                                onClick={() => imageRef.current?.click()}
                              />
                            </Tooltip>
                          </Flex>
                        </React.Fragment>
                      )
                    })}
                  </SimpleGrid>
                </RadioGroup>
              )}
            </Box>
          </ExpandShow>
        </ListItem>
        <ListItem>
          <FormControl mt={3}>
            <Flex align="center">
              <Label name="Background Color" />
              <Input
                type="color"
                {...register('color')}
              />
            </Flex>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl mt={3}>
            <Flex align="center">
              <Label name="Homepage" />
              <Input
                {...register('homepage')}
              />
              {homepage?.length > 0 && (
                <chakra.a ml={2} href={homepage} target="_blank">
                  <ExternalLinkIcon />
                </chakra.a>
              )}
            </Flex>
          </FormControl>
        </ListItem>
        <ListItem>
          <ExpandShow name="Description">
            <Tabs ml={5} isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Markdown</Tab>
                <Tab>Preview</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Textarea
                    placeholder="Enter a markdown formatted description."
                    minH={32}
                    {...register('description')}
                  />
                </TabPanel>
                <TabPanel>
                  <Markdown>
                    {description}
                  </Markdown>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ExpandShow>
        </ListItem>
        <ListItem>
          <ExpandShow name="Animation">
            <Box m={3}>
              {typeof animation === 'string' && (
                <Flex>
                  <Text>
                    {decodeURI(animation.replace(
                      /^ipfs:\/\/[^/]+\//, ''
                    ))}
                  </Text>
                  <Link href={httpURL(animation)} ml={3} mb={5} isExternal>
                    <ExternalLinkIcon />
                  </Link>
                </Flex>
              )}
              {typeof File !== 'undefined' && animation instanceof File && (
                <Flex>
                  <Text>{animation.name}</Text>
                  <chakra.a
                    href={URL.createObjectURL(animation)}
                    target="_blank" ml={3} mb={5}
                  >
                    <ExternalLinkIcon />
                  </chakra.a>
                </Flex>
              )}
              <Input
                type="file"
                accept="model/gltf+json,model/gltf-binary,video/*,.gltf,.glb"
                onChange={configAnimation}
                h="auto"
              />
            </Box>
          </ExpandShow>
        </ListItem>
        <ListItem id="attributes">
          <ExpandShow
            name="Attributes"
            button={<Button ml={2} onClick={addRow} size="xs">
              <AddIcon />
            </Button>}
          >
            {attributes.length > 0 && (
              <Table
                sx={{ 'th, td': { textAlign: 'center' } }}
              >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Value</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attributes.map((_, index) => (
                    <AttrRow
                      key={index}
                      {...{
                        attributes, setAttributes, index,
                      }}
                    />
                  ))}
                </Tbody>
              </Table>
            )}
          </ExpandShow>
        </ListItem>
        <ListItem>
          <ExpandShow
            name="Models"
            button={<Button ml={2} onClick={onOpen} size="xs">
              <AddIcon />
            </Button>}
          >
            {Object.keys(wearables).length === 0 ? (
              <em>None</em>
            ) : (
              <UnorderedList>
                {Object.entries(wearables).map(
                  ([mimetype, model], idx) => (
                    <ListItem key={idx}>
                      <a href={httpURL(model as string)}>{mimetype}</a>
                    </ListItem>
                  )
                )}
              </UnorderedList>
            )}
            <ModelModal
              {...{
                isOpen, onClose, setWearables,
              }}
            />
          </ExpandShow>
        </ListItem>
      </UnorderedList>
    )
  }
export default NFTForm