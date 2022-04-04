import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ContextProvider } from 'lib/hooks'

const App = ({ Component, pageProps }: AppProps) => {
  const prod = process.env.NODE_ENV === 'production'

  return (
    <ChakraProvider>
      <Head>
        <link
          rel="shortcut icon"
          href={`${prod ? '/chievemints' : ''}/favicon.png`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  )
}

export default App
