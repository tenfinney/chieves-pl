import { Flex, FlexProps, Tooltip } from '@chakra-ui/react'
import { LinkedSVG } from '@/components'
import React from 'react'

export const Header: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <Tooltip hasArrow label="Create A New Token Type">
      <LinkedSVG
        w="min(40%, 75vh)" h="auto"
        svg="logo.svg"
        href={links.cup}
        title="Create a new Token"
      />
    </Tooltip>
    <Tooltip hasArrow label="List Existing Tokens">
      <LinkedSVG
        w="75%" h="auto"
        ml="-15%"
        svg="header.svg"
        href={links.sign}
        title="View Existing Tokens"
      />
    </Tooltip>
  </Flex>
)

export default Header