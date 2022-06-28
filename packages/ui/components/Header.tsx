import { MinusIcon } from '@chakra-ui/icons'
import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="min(40%, 50vh)" h="auto"
      mt="30px"
      ml="-5%"
      svg="header.png"
      href={links.cup}
      title="Create A New Token"
    />
    <LinkedSVG
      w="min(50%, 50vh)" h="auto"
      maxH="500px"
      mt="30px"
      ml="-20%"
      svg="logo.png"
      href={links.sign}
      title="View Existing Tokens"
    />
  </Flex>
)

export default Header