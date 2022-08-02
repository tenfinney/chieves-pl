import {
  Box, Link as ChakraLink, LinkProps, chakra
} from '@chakra-ui/react'
import React from 'react'

export const LinkedSVG = React.forwardRef<
  HTMLObjectElement,
  LinkProps & { href: string, svg: string }
> = ({ href, svg: data, ...props }) => (
  <ChakraLink
    position="relative"
    zIndex={1}
    {...props}
    {...{ href }}
  >
    <Box display="inline-block" w="full" h="full">
      <chakra.object
        maxH="100%"
        {...{ data }}
        position="relative"
        zIndex={-1}
      />
    </Box>
  </ChakraLink>
)

LinkedSVG.displayName = 'LinkedSVG'

