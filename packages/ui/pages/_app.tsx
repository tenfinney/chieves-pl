import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ContextProvider } from 'lib/hooks'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic',
  cache: new InMemoryCache(),
})

const App = ({ Component, pageProps }: AppProps) => (
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
    <ApolloProvider {...{ client }}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ApolloProvider>
  </ChakraProvider>
)

export default App
