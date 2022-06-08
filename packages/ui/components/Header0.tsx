import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const Header0: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="min(20%, 20vh)" h="auto"
      ml="-5%"
      svg="smartlaw-w.png"
      href={links.cup}
      title="Create A New Token"
    />
  </Flex>
)

export default Header0