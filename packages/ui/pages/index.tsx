import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Image, } from '@chakra-ui/react'

const Home: NextPage = () => (
  <Container>
    <Head>
      <title>MetaGame’s NFTs</title>
      <meta name="description" content="MetaGame’s Achievements NFTs" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Image src="/vercel.svg" alt="Vercel Logo" w={72} h={16} />
  </Container>
)

export default Home
