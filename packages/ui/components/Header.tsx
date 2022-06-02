import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="min(40%, 50vh)" h="auto"
      ml="-5%"
      svg="logo.svg"
      href={links.cup}
      title="Create A New Token"
    />
    <LinkedSVG
      w="50%" h="auto"
      ml="-10%"
      svg="header.svg"
      href={links.sign}
      title="View Existing Tokens"
    />
  </Flex>
)

export default Header