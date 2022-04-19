import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box,
  Button, Container, Tabs, TabList, Tab,
  TabPanels, TabPanel, FormControl, FormLabel, Textarea,
  OrderedList, ListItem, Stack, Text, Flex, Spinner, Checkbox,
} from '@chakra-ui/react'
import {  BigNumber } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { httpURL } from 'lib/helpers'
import { Maybe, ERC1155Metadata } from 'lib/types'
import { useWeb3 } from 'lib/hooks'
import { HomeLink } from 'components'

const Address: React.FC<{ name: string }> = ({ name }) => {
  const { ensProvider } = useWeb3()
  const isAddress = useMemo(
    () => /^0x[a-z0-9]{40}$/i.test(name),
    [name],
  )
  const [address, setAddress] = useState<string | ReactNode>(
    isAddress ? undefined : <Spinner size="xs"/>
  )
  useMemo(
    () => {
      if(!isAddress) {
        const resolve = async () => {
          const resolved = await ensProvider?.resolveName(name)
          setAddress(resolved ?? 'Not Found')
        }
        resolve()
      }
    },
    [isAddress, ensProvider, name],
  )

  return (
    <Text>
      {name}
      {address !== undefined && (
        <>{' '}<Text as="em">({address})</Text></>
      )}
    </Text>
  )
}

const Disburse: NextPage = () => {
  const router = useRouter()
  const tokenId = router.query.nftId
  const tokenNum = useMemo(
    () => (tokenId ? BigNumber.from(Number(tokenId)) : null),
    [tokenId],
  )
  const [balance, setBalance] = useState<number>()
  const [metadata, setMetadata] = (
    useState<Maybe<ERC1155Metadata>>()
  )
  const [error, setError] = useState<string>()
  const [raw, setRaw] = useState('')
  const {
    ensProvider, address, roContract, connected, connect
  } = useWeb3()
  const [addresses, setAddresses] = useState<Array<string | ReactNode>>([])
  
  useEffect(() => {
    const parse = async () => {
      setAddresses(
        raw.split(/\s*[\s,;:/\|]+\s*/)
        .filter((str) => str && str !== '')
        .map((name, idx) => <Address key={idx} {...{ name }}/>)
      )
    }

    parse()
  }, [ensProvider, raw])

  const name = useMemo(
    () => metadata?.name ?? `#${tokenId}`,
    [metadata, tokenId],
  )

  useEffect(() => {
    const getBalance = async () => {
      if(roContract && address && tokenId) {
        try {
          setBalance(Number(
            (await roContract.balanceOf(address, tokenId)).toString()
          ))
        } catch(err) {
          setError((err as Error).message)
        }
      }
    }

    getBalance()
  }, [address, roContract, tokenId])

  useEffect(
    () => {
      const getMetadata = async () => {
        if(roContract && tokenId) {
          try {
            const meta = await roContract.uri(tokenId)
            if(!meta) {
              setMetadata(null)
            } else {
              const response = await fetch(httpURL(meta))
              setMetadata(await response.json())
            }
          } catch(err) {
            setError((err as Error).message)
          }
        }
      }

      getMetadata()
    },
    [roContract, tokenId],
  )

  if(error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error: Loading NFT</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Container maxW="40rem">
      <Head>
        <title>Disburse NFT #{tokenId}</title>
        <meta name="description" content="Distribute A ’Chievemint NFT" />
      </Head>

      <HomeLink/>

      <Stack>
        {(() => {
          if(metadata === null) {
            return <Text my={8}>Token {name} does not exist.</Text>
          } else if(!address) {
            return (
              <Text my={8}>
                Connect your wallet to distribute “{name}” tokens…
              </Text>
            )
          } else if(balance === 0) {
            return <Text my={8}>You have no “{name}” tokens to distribute…</Text>
           } else if(balance == null) {
            return (
              <Flex my={8}>
                <Spinner/>
                <Text ml={2}>Loading Balance…</Text>
              </Flex>
            )
          } else {
            return <Text my={8}>Distribute up to {balance} “{name}” tokens:</Text>
          }
        })()}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>CSV</Tab>
            <Tab>Parsed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl>
                <FormLabel>Comma, Space, or Semicolon Separated ETH or ENS Addresses:</FormLabel>
                <Textarea
                  height={64}
                  placeholder="Enter space, semicolon, or comma separated eth addresses."
                  value={raw}
                  onChange={({ target: { value } }) => setRaw(value)}
                />
              </FormControl>
            </TabPanel>
            <TabPanel>
              <OrderedList>
                {addresses.map((addr, idx) => (
                  <ListItem key={idx} justifyContent="center">
                    {addr}
                  </ListItem>
                ))}
              </OrderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <FormControl>
          <Checkbox>Don’t distribute to existing holders</Checkbox>
        </FormControl>
        <FormControl textAlign="center">
          <Button colorScheme="green">Distribute</Button>
        </FormControl>
      </Stack>
    </Container>
  )
}

export default Disburse