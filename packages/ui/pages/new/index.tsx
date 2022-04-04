import { NextPage } from 'next'
import FormOptions from 'components/FormOptions'
import { Button, Center, Flex, Heading, Spinner, Text, chakra, Stack, Container } from '@chakra-ui/react';
import { useWeb3 } from 'lib/hooks'
import { useCallback, useState } from 'react'
import { NETWORKS } from '../../lib/networks';
import { switchTo } from 'lib/helpers';
import Head from 'next/head';

export const New: NextPage = () => (
  <Container maxW="full">
    <Head>
      <title>’𝖈𝖍𝖎𝖊𝖛𝖊: Ⲛⲉⲱ Ⲧⲟⲕⲉⲛ</title>
    </Head>
    <Content/>
  </Container>
)

const Content: React.FC = () => {
  const {
    rwContract, connecting, connect, chain,
  } = useWeb3()
  const [tokenId, setTokenId] = useState<string>()

  const reserve = useCallback(async () => {
    if(!rwContract) {
      throw new Error('Connect your wallet to reserve an id.')
    }
    const tx = await rwContract.create()
    setTokenId(tx.wait())
  }, [rwContract])

  if(!rwContract || !tokenId) {
    return (
      <Center h="100vh">
        <Stack>
          <Heading>
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
                <Flex>
                  <Spinner thickness="4px"/>
                  <Text ml={2}>Connecting…</Text>
                </Flex>
              )
            }
            if(chain && chain !== NETWORKS.contract.chainId) {
              return (
                <Button onClick={() => {
                  switchTo(NETWORKS.contract.chainId)
                }}>
                  Switch to the
                  {` ${NETWORKS.contract.name} `}
                  chain
                </Button>
              )
            }
            if(!rwContract) {
              return (
                <Button onClick={connect}>Connect</Button>
              )
            }
            if(!tokenId) {
              return (
                <Button onClick={reserve}>
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