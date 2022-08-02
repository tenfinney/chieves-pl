import { NextPage } from 'next'
import { OptionsForm } from 'components'
import {
  Box, Button, Center, Flex, Heading, Spinner, Text, chakra,
  Stack, Container, useToast, Table, Thead, Th, Tr, Tbody, Td, Checkbox, Input,
} from '@chakra-ui/react'
import { useWeb3 } from 'lib/hooks'
import { useCallback, useEffect, useState } from 'react'
import { NETWORKS } from '../../lib/networks'
import { switchTo } from 'lib/helpers'
import Head from 'next/head'
import { Header1, Header2, Header3, HeaderLogo } from 'components'
import { useRouter } from 'next/router'
import { Event, utils as ethUtils } from 'ethers'
import { MetaMaskError, NestedError } from '../../lib/types'
import { useForm } from 'react-hook-form'

export const New: NextPage = () => (
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
  const { query: { tokenId: id } } = useRouter()
  const [tokenId, setTokenId] = (
    useState(Array.isArray(id) ? id[0] : id)
  )
  const [roles, setRoles] = useState<Array<string>>([])
  const [working, setWorking] = useState(false)
  const { register, handleSubmit } = useForm()
  const toast = useToast()

  useEffect(() => {
    if(typeof id === 'string') {
      setTokenId(id)
    }
  }, [id])

  useEffect(() => {
    const load = async () => {
      if(roContract) {
        console.log({roContract})
        const numRoles = (await roContract.roleIndexForName('ReservedLast')) - 1
        const roles = await Promise.all(
          Array.from({ length: numRoles }).map(async (_, idx) => (
            await roContract.roleNameByIndex(idx + 1)
          ))
        )
        setRoles(roles)
      }
    }

    load()
  }, [roContract])

  const reserve = useCallback(async (data) => {
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
      if(!ensProvider){
        throw new Error('ENS provider not defined.')
      }
      const grants: Array<number> = []
      const disables: Array<number> = []
      await Promise.all(Object.entries(data).map(
        async ([key, value]: [key: string, value: unknown]) => {
          if(typeof value === 'boolean' && value) {
            const [_, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? []
            console.log({type, role})
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
      if(maintainer.includes('.')){
        maintainer = await ensProvider.resolveName(maintainer)
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
      const [id, _controller] = event.args
      setTokenId(id.toHexString())
    } catch(error) {
      console.error({error})
      const msg = (
        (error as NestedError).error?.message
        ?? (error as MetaMaskError).data?.message
        ?? (error as Error).message
        ?? error
      )
      toast({
        title: 'Creation Error',
        description: msg,
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    } finally {
      setWorking(false)
    }
  }, [rwContract])

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
            Create a new
            <chakra.span
              title="Unique Cred Token"
              ml={2}
            >
              Access Token
            </chakra.span>
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
                  <Input
                    {...register('maintainer')}
                    placeholder="Maintainer Address (default Creator)"
                  />
                  <Table mb={5}>
                    <Thead>
                      <Tr>
                        <Th>Role</Th>
                        <Th>Grant</Th>
                        <Th>Disable</Th>
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