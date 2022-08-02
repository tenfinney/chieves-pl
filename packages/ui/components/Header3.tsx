import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header3: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="min(40%, 20vh)" h="40"
      mt="1px"
      ml="5%"
      svg="reserve-green-800v.png"
      href={links.cup}
      title="Create A New Token"
    />
    <LinkedSVG
      w="min(40%, 20vh)" h="40"
      mt="1px"
      ml="10%"
      svg="token-tools-800w.png"
      href={links.sign}
      title="Create A New Token"
    />
  </Flex>
  
)

export default Header3