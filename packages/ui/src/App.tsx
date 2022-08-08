
import { Helmet } from 'react-helmet'
import {
  ChakraProvider, Spinner, ColorModeScript,
  ThemeConfig, extendTheme,
} from '@chakra-ui/react'
import { Web3ContextProvider } from '@/lib/hooks'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { CONFIG } from '@/config'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import React from 'react'

const Home = React.lazy(() => import('./pages/home'))
const New = React.lazy(() => import('./pages/new'))
const View = React.lazy(() => import('./pages/view'))
const Edit = React.lazy(() => import('./pages/edit'))
const Disburse = React.lazy(() => import('./pages/disburse'))

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  // useSystemColorMode: true,
}
const theme = extendTheme({ config: themeConfig })

const client = new ApolloClient({
  uri: CONFIG.nftGraph,
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <Helmet>
        <link
          rel="shortcut icon"
          href="favicon.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Helmet>
      <ApolloProvider {...{ client }}>
        <Web3ContextProvider>
          <React.Suspense fallback={<Spinner/>}>
            <Router>
              <Routes>
                <Route path="/new" element={<New/>} />
                <Route path="/view/:nftId" element={<View/>} />
                <Route path="/disburse/:nftId" element={<Disburse/>} />
                <Route path="/edit/:nftId" element={<Edit/>} />
                <Route path="/" element={<Home/>} />
              </Routes>
            </Router>
          </React.Suspense>
        </Web3ContextProvider>
      </ApolloProvider>
    </ChakraProvider>
  </>
)

export default App 