import { AddIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Input, chakra, Select, Td, Tooltip, Button, useToast, useDisclosure, Tr, InputProps, Container, UnorderedList, ListItem, FormControl, Flex, FormLabel, Box, Text, Link, Image, Tabs, TabList, Tab, TabPanels, TabPanel, Textarea, Table, Thead, Th, Tbody, ModalFooter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import CONFIG from 'config';
import { NFT_HOMEPAGE_BASE } from 'lib/constants';
import { capitalize, httpURL, isEmpty } from 'lib/helpers'
import { useWeb3 } from 'lib/hooks'
import { NETWORKS } from 'lib/networks';
import { Attribute, ERC1155Metadata, Maybe } from 'lib/types'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown';

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
                   setValue(!!value ? Number(value) : '')
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
 
 const Submit: React.FC<InputProps & {
   purpose: string
 }> = ({ purpose, ...props }) => {
  const { chain } = useWeb3()
  const desiredNetwork = NETWORKS.contract.name

  return (
    <Input
      variant="filled" type="submit"
      value={capitalize(purpose)}
      title={
        !desiredNetwork ? `${capitalize(purpose)} NFT` : (
          `Connect to the ${desiredNetwork} network.`
        )
      }
      isDisabled={!!desiredNetwork}
      {...props}
    />
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
   onSubmit?: () => void
   metadata?: Maybe<ERC1155Metadata>
 }> = ({
   purpose = 'create', onSubmit, metadata,
 }) => {
   const { roContract, rwContract, ensProvider } = useWeb3()
   const [name, setName] = useState('')
   const [tokenId, setTokenId] = useState<string>()
   const [description, setDescription] = useState('')
   const [homepage, setHomepage] = useState('')
   const [image, setImage] = useState<Maybe<File | string>>()
   const imageRef = useRef<HTMLInputElement>(null)
   const [animation, setAnimation] = useState<Maybe<File | string>>()
   const [wearables, setWearables] = useState({})
   const [attributes, setAttributes] = (
     useState<Array<AttrProps>>([])
   )
   const [color, setColor] = useState('#FFFFFF')
   const [quantity, setQuantity] = useState<string | number>(1)
   const [treasurer, setTreasurer] = useState('')
   const { isOpen, onOpen, onClose } = useDisclosure()
   const router = useRouter()
   const toast = useToast()
 
   useEffect(() => {
     if (metadata) {
       Object.entries({
         name: setName, description: setDescription,
         external_url: setHomepage, animation_url: setAnimation,
         image: setImage, treasurer: setTreasurer,
       })
       .forEach(([prop, setter]) => {
         setter(metadata[prop] as string)
       })
 
       const attrs = metadata.attributes
       if (!isEmpty(attrs)) {
         setAttributes((attrs ?? []).map(({
           trait_type: name, value, display_type: type = 'string',
         }: Attribute) => ({ name, value, type })))
       }
 
       setWearables(metadata.properties?.wearables ?? {})
 
       const bg = metadata.background_color
       setColor(prev => bg ? `#${bg}` : prev)
     }
   }, [metadata])
 
   useEffect(() => {
     ((async () => {
       if (!!roContract && purpose === 'create' && !homepage) {
         try {
           let nextId = (
             (parseInt(await roContract.tokenTypeCount(), 16) + 1)
               .toString(16)
           )
           nextId = `0x${nextId}`
           setTokenId(nextId)
           setHomepage(
             `${NFT_HOMEPAGE_BASE}/${nextId}`
           )
         } catch (err) {
           console.error('Get Token Id', (err as Error).message)
         }
       }
     })())
   }, [roContract, purpose, homepage])
 
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
     if (files?.length === 1) {
       setImage(files[0])
     } else {
       setImage(null)
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
 
   const ipfsify = async (fileOrURL: File | string | NamedString) => {
     let value: File | NamedString = fileOrURL as NamedString
     if (typeof fileOrURL === 'string') {
       if (fileOrURL.startsWith?.('ipfs://')) {
         return fileOrURL
       }
       value = {
         name: 'Unknown',
         content: fileOrURL,
       }
     }
     const name = value.name
     const result = await CONFIG.ipfs.add(
       { path: name, content: value.content ?? fileOrURL },
       { pin: true, wrapWithDirectory: true }
     )
     return `ipfs://${result.cid.toString()}/${name}`
   }
 
   const enact = useCallback(async (metadata) => {
     try {
       if (purpose === 'create') {
         const enact = (
           window.confirm(
             `¿Mint ${quantity} token${quantity === 1 ? '' : 's'
             } to ${treasurer}?`
           )
         )
         if (enact) {
           const address = await ensProvider?.resolveName(treasurer)
           if (!address) {
             throw new Error(`Couldn't resolve ENS name: “${treasurer}”`)
           }
           if (typeof quantity !== 'string') {
             const tokenId = (
               await rwContract?.['mint(address,uint256,string,bytes)'](
                 address, quantity, metadata, []
               )
             )
             router.push(`/view/${tokenId}`)
           } else if (quantity === '') {
             throw new Error('No quantity specified.')
           } else {
             throw new Error(`Quantity: “${quantity}”`)
           }
         }
       } else if (purpose === 'update') {
         // const [tokenId] = router.query.id.split('-').slice(-1)
         // await contract.setURI(metadata, parseInt(tokenId, 16))
       }
     } catch (err) {
       toast({
         title: 'Contract Error',
         description: (err as Error).message,
         status: 'error',
         isClosable: true,
         duration: 10000
       })
     }
   }, [purpose, rwContract, quantity, router, treasurer, ensProvider, toast])
 
   const submit = async (evt: FormEvent) => {
     evt.preventDefault()
 
     const metadata: ERC1155Metadata = {
       name: name ?? 'Untitled', description, decimals: 0,
     }
 
     if (!!homepage) {
       metadata.external_url = homepage
     }
 
     if (image instanceof File || typeof image === 'string') {
       metadata.image = await ipfsify(image)
     } else if (image !== undefined) {
       console.warn(`Unknown Image Type: ${typeof image}`)
     }
 
     if (animation instanceof File || typeof animation === 'string') {
       metadata.animation_url = await ipfsify(animation)
     } else if (animation !== undefined) {
       console.warn(`Unknown Animation Type: ${typeof animation}`)
     }
 
     if (color.startsWith('#')) {
       metadata.background_color = (
         color.substring(1).toUpperCase()
       )
     }
 
     metadata.properties = {}
 
     if (Object.keys(wearables).length > 0) {
       metadata.properties.wearables = (
         Object.fromEntries(
           await Promise.all(
             Object.entries(wearables).map(
               async ([type, value]) => (
                 [type, await ipfsify(value as string | File)]
               )
             )
           )
         )
       )
     }
 
     if (attributes.length > 0) {
       metadata.attributes = (
         attributes.map(({ name, value, type }) => {
           const attr: Attribute = {
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
 
     const dataURI = await ipfsify({
       name: `metadata.${(new Date()).toISOString()}.json`,
       content: JSON.stringify(metadata, null, '  '),
     })
 
     await enact(dataURI)
   }
 
   // if (desiredNetwork) {
   //   return (
   //     <Heading size="sm" mt={20} textAlign="center">
   //       Please change your network to {desiredNetwork}.
   //     </Heading>
   //   )
   // }
 
   return (
     <Container
       as="form" onSubmit={submit}
       mt={10} maxW={['100%', 'min(85vw, 50em)']}
       sx={{ a: { textDecoration: 'underline' } }}
     >
       <Head>
         <title>{capitalize(purpose)} ’Chievemint NFT</title>
       </Head>
       <Submit {...{ purpose }} mb={3} />
       <UnorderedList listStyleType="none">
         {purpose === 'create' && (
           <ListItem>
             <FormControl isRequired>
               <Flex align="center">
                 <FormLabel>Quantity to Mint</FormLabel>
                 <Input
                   type="number" autoFocus
                   value={quantity}
                   onChange={({ target: { value } }) => {
                     setQuantity(value ? parseInt(value, 10) : '')
                   }}
                   placeholder="¿How many tokens to mint?"
                 />
               </Flex>
             </FormControl>
           </ListItem>
         )}
         {purpose === 'create' && (
           <ListItem>
             <FormControl isRequired mt={3}>
               <Flex align="center">
                 <FormLabel>Treasurer</FormLabel>
                 <Input
                   type="text"
                   value={treasurer}
                   onChange={({ target: { value } }) => (
                     setTreasurer(value)
                   )}
                   placeholder="¿Who should receive the new tokens?"
                 />
               </Flex>
             </FormControl>
           </ListItem>
         )}
         <ListItem>
           <FormControl mt={3}>
             <Flex align="center">
               <FormLabel>Name</FormLabel>
               <Input
                 value={name} autoFocus={purpose !== 'create'}
                 onChange={({ target: { value } }) => setName(value)}
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
                 display={image ? 'none' : 'inherit'}
                 h="auto"
               />
               {image && (
                 <Image
                   alt="NFT Display Image"
                   src={
                     (image instanceof File) ? (
                       URL.createObjectURL(image)
                     ) : (
                       httpURL(image)
                     )
                   }
                   maxH={60} mt={0} bg={color}
                   onClick={() => imageRef.current?.click()}
                 />
               )}
             </Box>
           </ExpandShow>
         </ListItem>
         <ListItem>
           <FormControl mt={3}>
             <Flex align="center">
               <Label name="Background Color" />
               <Input
                 type="color" value={color}
                 onChange={({ target: { value } }) => setColor(value)}
               />
             </Flex>
           </FormControl>
         </ListItem>
         <ListItem>
           <FormControl mt={3}>
             <Flex align="center">
               <Label name="Homepage" />
               <Input
                 value={homepage}
                 onChange={({ target: { value } }) => (
                   setHomepage(value)
                 )}
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
                     value={description} minH={32}
                     onChange={({ target: { value } }) => (
                       setDescription(value)
                     )}
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
       <Submit {...{ purpose }} mt={3} />
     </Container>
   )
 }
 
 export default NFTForm