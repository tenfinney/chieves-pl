import {
  Box, chakra, Flex, Link as ChakraLink,
  LinkProps, FlexProps, Tooltip,
} from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="40%" h="-webkit-fill-available"
      svg="logo.svg"
      href={links.cup}
      title="Create A New Token"
    />
    <LinkedSVG
      w="75%" h="-webkit-fill-available"
      ml="-15%"
      svg="header.svg"
      href={links.sign}
      title="View Existing Tokens"
    />
  </Flex>
)

export default Header