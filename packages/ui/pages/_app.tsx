import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Web3ContextProvider } from 'lib/hooks'
import { ChakraProvider } from '@chakra-ui/react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic',
  cache: new InMemoryCache(),
})

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider {...{ client }}>
    <Web3ContextProvider>
      <ChakraProvider>
        <Head>
          <link
            rel="shortcut icon"
            href="favicon.png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ContextProvider>
  </ApolloProvider>
)

export default App
