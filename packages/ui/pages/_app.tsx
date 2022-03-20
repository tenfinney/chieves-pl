import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.png"/>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
