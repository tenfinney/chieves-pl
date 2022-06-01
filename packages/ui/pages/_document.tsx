import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

// export default class Document extends NextDocument {
export const Document = () => (
  <Html lang='en'>
    <Head />
    <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document