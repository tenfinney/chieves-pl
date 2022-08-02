import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from 'components'

export const HeaderLogo: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex grow={1} {...props}>
    <LinkedSVG
      w="min(30%, 10vh)" h="40"
      mt="1px"
      ml="2%"
      svg="smartlaw-w.png"
      href={links.cup}
      title="Create A New Token"
    />
    {/* <LinkedSVG
      w="min(40%, 20vh)" h="150"
      mt="1px"
      ml="30%"
      svg="animate.gif"
      href={links.sign}
      title="Create A New Token"
    /> */}
  </Flex>
  
)

export default HeaderLogo