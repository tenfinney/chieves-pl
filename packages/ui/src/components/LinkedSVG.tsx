import {
  Box, Link as ChakraLink, LinkProps, chakra
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

const RouterLink = chakra(ReactRouterLink)

export const LinkedSVG = React.forwardRef<
  HTMLObjectElement,
  LinkProps & { href: string, svg: string }
>(
  (
    { href = '#', svg: data, ...props },
    ref
  ) => (
  <RouterLink
    position="relative"
    zIndex={1}
    to={href}
    {...props}
  >
    <Box display="inline-block" w="full" h="full">
      <chakra.object
        maxH="100%"
        {...{ data, ref }}
        position="relative"
        zIndex={-1}
      />
    </Box>
  </RouterLink>
  )
)

LinkedSVG.displayName = 'LinkedSVG'

