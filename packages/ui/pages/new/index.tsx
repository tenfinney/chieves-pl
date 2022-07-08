import { NextPage } from 'next'
import { OptionsForm } from 'components'
import {
  Button, Center, Flex, Heading, Spinner, Text, chakra,
  Stack, Container, useToast,
} from '@chakra-ui/react'
import { useWeb3 } from 'lib/hooks'
import { useCallback, useEffect, useState } from 'react'
import { NETWORKS } from '../../lib/networks'
import { switchTo } from 'lib/helpers'
import Head from 'next/head'
import { Header } from 'components'
import { useRouter } from 'next/router'
import { Event, utils as ethUtils } from 'ethers'
import { MetaMaskError, NestedError } from '../../lib/types'

export const New: NextPage = () => (
  <Container maxW="full">
    <Head>
      <title>New SmartLaw Cred Token</title>
    </Head>
    <chakra.header>
      <Flex justify="center">
        <Header my="1vh" maxW="xl"/>
      </Flex>
    </chakra.header>
    <chakra.main>
      <Content/>
    </chakra.main>
  </Container>
) 

const Content: React.FC = () => {
  const {
    rwContract, connecting, connect, chain, address,
  } = useWeb3()
  const { query: { tokenId: id } } = useRouter()
  const [tokenId, setTokenId] = (
    useState(Array.isArray(id) ? id[0] : id)
  )
  const [working, setWorking] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if(typeof id === 'string') {
      setTokenId(id)
    }
  }, [id])

  const reserve = useCallback(async () => {
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
      <Center>
        <Stack>
          <Heading textAlign="center">
            Create a new
            <chakra.span
              title="Unique Cred Token"
              ml={2}
            >
              Cred Token
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
                  <Text ml={2}>Reserving…</Text>
                </Flex>
              )
            }
            if(!tokenId) {
              return (
                <Button
                  colorScheme="green"
                  onClick={reserve}
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
    )
  }

  return (
    <OptionsForm {...{ tokenId }}/>
  )
}

export default New