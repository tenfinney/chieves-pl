import {
  Button, Center, Flex, Heading, Spinner, Text, chakra,
  Stack, Container, useToast, Table, Thead, Th, Tr,
  Tbody, Td, Checkbox, Input, Tooltip, Box,
} from '@chakra-ui/react'
import { useWeb3 } from '@/lib/hooks'
import { useCallback, useEffect, useState } from 'react'
import { NETWORKS } from '@/lib/networks'
import { Helmet } from 'react-helmet'
import { Header, OptionsForm } from '@/components'
import { Event } from 'ethers'
import { useForm } from 'react-hook-form'
import { CONFIG } from '@/config'
import { switchTo, extractMessage } from '@/lib/helpers'

export const New = () => (
  <Container maxW="full">
    <Head>
      <title>New SmartLaw Cred Token</title>
    </Head>
    <chakra.header>
      <Flex justify="center">
        <Header1 my="1vh" maxW="xl"/>
      </Flex>      
    <Flex justify="center">
        <HeaderLogo my="1vh" maxW="xl"/>
      </Flex>
      <Flex justify="center">
        <Header2 my="1vh" maxW="xl"/>
      </Flex>
      <Flex justify="center">
        <Header3 my="1vh" maxW="xl"/>
      </Flex>
      <Flex justify="center">
        <Header1 my="1vh" maxW="xl"/>
      </Flex>

    </chakra.header>
    <chakra.main>
      <Content/>
    </chakra.main>
  </Container>
)

const Content: React.FC = () => {
  const {
    ensProvider, roContract, rwContract, connecting, connect, chain, address,
  } = useWeb3()
  console.log({connecting})
  const [search, setSearch] = useSearchParams({ tokenId: '' })
  const id = search.get('tokenId')
  const [tokenId, setTokenId] = (
    useState(Array.isArray(id) ? id[0] : id)
  )
  const [roles, setRoles] = useState<Array<string>>([])
  const [working, setWorking] = useState(false)
  const { register, handleSubmit } = useForm()
  const toast = useToast()
  const { rolePermissions } = CONFIG

  useEffect(() => {
    if(typeof id === 'string') {
      setTokenId(id)
    }
  }, [id])

  useEffect(() => {
    const load = async () => {
      if(roContract) {
        const numRoles = (await roContract.roleIndexForName('ReservedLast')) - 1
        const roles: Array<string> = await Promise.all(
          Array.from({ length: numRoles }).map(async (_, idx) => (
            await roContract.roleNameByIndex(idx + 1)
          ))
        )
        setRoles(roles)
      }
    }

    load()
  }, [roContract])

  const reserve = useCallback(
    async (data: { maintainer?: string }) => {
      setWorking(true)

    try {
      if(!rwContract) {
        throw new Error(
          'Connect your Web3 account to reserve an ID.'
        )
      }
      if(!roContract){
        throw new Error('Library not loaded.')
      }
      const grants: Array<number> = []
      const disables: Array<number> = []
      await Promise.all(Object.entries(data).map(
        async ([key, value]: [key: string, value: unknown]) => {
          if(typeof value === 'boolean' && value) {
            const [, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? []
            const roleId = await rwContract.roleIndexForName(role)
            switch(type) {
              case 'grant': {
                grants.push(roleId)
                break
              }
              case 'disable': {
                disables.push(roleId)
                break
              }
              default: {
                throw new Error(`Unknown operation: ${type}`)
              }
            }
          }
        }
      ))
    
      let { maintainer } = data
      if(maintainer === '') {
        maintainer = address
      }
      if(maintainer?.includes('.')) {
        if(!ensProvider) {
          throw new Error('ENS provider not defined.')
        }
        maintainer = await ensProvider.resolveName(maintainer) ?? undefined
      }
      const tx = await rwContract['create(address,uint8[],uint8[])'](
        maintainer, grants, disables
      )
      const receipt = await tx.wait()
      const event = receipt.events.find(
        (evt: Event) => evt.event === 'Created'
      )
      if(!event) {
        throw new Error(
          'Couldn’t find a token creation event.'
        )
      }
      const [id] = event.args
      setTokenId(id.toHexString())
    } catch(error) {
      toast({
        title: 'Creation Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
      console.error((error as Error).stack)
    } finally {
      setWorking(false)
    }
  }, [address, ensProvider, roContract, rwContract, toast])

  if(!rwContract || !tokenId || working) {
    return (
      <Box ml="50px">
      <Text fontSize="24pt" mt="1rem" fontWeight="bold">
        ERC-1155 Access and Achievment Token Minting
      </Text>
      <Text ml="20px" fontSize="18pt" fontWeight="bold">
        Digital Tokens on the Polygon EVM Blockchain using IPFS
      </Text>
      <Text ml="50px" fontSize="12pt" fontWeight="regular">
        Each token reservation mints one (1) master token and up to (11) role
        tokens. Superuser, Minter, Caster, Transferer, Configurer, Maintainer, Creator, Limiter, Burner, Destroyer, and/or Oracle can be automatically minted with
        the master token and can be assigned to third-parties for
        administration.
      </Text>
      <br/>
      <hr/>
      <br/>
      <Center>
      <br />
        <Stack>
          <Heading textAlign="center">
            Create a New Token Type
          </Heading>
          {(() => {
            if(connecting) {
              return (
                <Flex justify="center">
                  <Spinner thickness="4px"/>
                  <Text ml={2}>Connecting…</Text>
                </Flex>
              )
            }
            if(chain && chain !== NETWORKS.contract.chainId) {
              return (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    switchTo(NETWORKS.contract.chainId)
                  }}
                >
                  Switch to the
                  <chakra.span
                    mx={1.5}
                    title={`${chain} ≠ ${NETWORKS.contract.chainId}`}
                  >
                    {NETWORKS.contract.name}
                  </chakra.span>
                  chain
                </Button>
              )
            }
            if(!rwContract) {
              console.info({ rwContract })
              return (
                <Button
                  colorScheme="blue"
                  onClick={connect}
                >
                  Connect
                </Button>
              )
            }
            if(working) {
              return (
                <Flex justify="center" mt={7}>
                  <Spinner/>
                  <Text ml={2}>Reserving your token…</Text>
                </Flex>
              )
            }
            if(!tokenId) {
              return (
                <Stack
                  as="form"
                  onSubmit={handleSubmit(reserve)}
                >
                  <Flex align="center">
                    <chakra.label mr={3}>Admin:</chakra.label>
                    <Input
                      {...register('maintainer')}
                      placeholder="Maintainer Address (default Creator)"
                    />
                  </Flex>
                  <Table mb={5}>
                    <Thead>
                      <Tr>
                        <Th>Role</Th>
                        <Th>
                          <Tooltip label="Give the admin these roles:">
                            Grant
                          </Tooltip>
                        </Th>
                        <Th>
                          <Tooltip label="Prevent these permissions from being checked:">
                            Disable
                          </Tooltip>
                        </Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {roles.map((role, idx) => (
                        <Tr key={idx}>
                          <Td>{role}</Td>
                          <Td textAlign="center">
                            <Checkbox {...register(`grant(${role})`)}/>
                          </Td>
                          <Td textAlign="center">
                            <Checkbox {...register(`disable(${role})`)}/>
                          </Td>
                          <Td>
                            {rolePermissions[role as keyof typeof rolePermissions]}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Button
                    colorScheme="green"
                    type="submit"
                  >
                    Reserve an ID
                  </Button>
                </Stack>
              )
            }
            return (
              <Text>We are glad you showed up!</Text>
            )
          })()}
        </Stack>
      </Center>
      </Box>
    )
  }

  return (
    <OptionsForm {...{ tokenId }}/>
  )
}

export default New