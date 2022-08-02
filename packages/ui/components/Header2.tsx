import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header2: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex grow={1} {...props}>
    <LinkedSVG
      w="min(40%, 20vh)" h="40"
      mt="1px"
      ml="5%"
      svg="header.png"
      href={links.cup}
      title="Create A New Token"
    />
    <LinkedSVG
      w="min(40%, 20vh)" h="40"
      mt="1px"
      ml="10%"
      svg="scott-stevenson-tenfinney-profile-002.png"
      href={links.sign}
      title="Create A New Token"
    />
  </Flex>
  
)

export default Header2