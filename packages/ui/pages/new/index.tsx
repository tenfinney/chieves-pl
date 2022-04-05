import { NextPage } from 'next'
import FormOptions from 'components/FormOptions'
import { Button, Center, Flex, Heading, Spinner, Text, chakra, Stack, Container } from '@chakra-ui/react';
import { useWeb3 } from 'lib/hooks'
import { useCallback, useState } from 'react'
import { NETWORKS } from '../../lib/networks';
import { switchTo } from 'lib/helpers';
import Head from 'next/head';
import { Header } from 'components'
import { useRouter } from 'next/router';
import { Event, utils as ethUtils } from 'ethers';

export const New: NextPage = () => (
  <Container maxW="full">
    <Head>
      <title>’𝖈𝖍𝖎𝖊𝖛𝖊: Ⲛⲉⲱ Ⲧⲟⲕⲉⲛ</title>
    </Head>
    <chakra.header>
      <Flex justify="center">
        <Header my="7vh" maxW="xl"/>
      </Flex>
    </chakra.header>
    <chakra.main>
      <Content/>
    </chakra.main>
  </Container>
) 

const Content: React.FC = () => {
  const {
    rwContract, connecting, connect, chain,
  } = useWeb3()
  const { query: { tokenId: id } } = useRouter()
  const [tokenId, setTokenId] = (
    useState(Array.isArray(id) ? id[0] : id)
  )
  const [working, setWorking] = useState(false)

  const reserve = useCallback(async () => {
    try {
      setWorking(true)

      if(!rwContract) {
        throw new Error('Connect your wallet to reserve an id.')
      }
      const tx = await rwContract['create()']()
      console.debug({ tx })
      const receipt = await tx.wait()
      console.debug({ receipt })
      let event = receipt.events.find(
        (evt: Event) => evt.event === 'Created'
      )
      if(!event) {
        console.warn(
          'Couldn’t find a creation event;'
          + ' attempting manual lookup.'
        )
        const iface = new ethUtils.Interface([
          "event Created(uint256 id, address controller)"
        ])
        const [{ data, topics }] = receipt.logs
        event = iface.decodeEventLog(
          'Created', data, topics
        )
        if(!event) {
          throw new Error('Couldn’t parse event.')
        }
      }
      console.debug({ event })
      const [id, controller] = event.args
      console.info({ id })
      setTokenId(id.toHexString())
    } finally {
      setWorking(false)
    }
  }, [rwContract])

  if(!rwContract || !tokenId || working) {
    return (
      <Center>
        <Stack>
          <Heading textAlign="center">
            Mint A New
            <chakra.span
              title="Non-Fungible Token"
              ml={2}
            >
              NFT
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
                  colorScheme="blue"
                  onClick={reserve}
                >
                  Reserve An ID
                </Button>
              )
            }
            return (
              <Text>¿How’d we get here?</Text>
            )
          })()}
        </Stack>
      </Center>
    )
  }

  return (
    <FormOptions {...{ tokenId }}/>
  )
}

export default New