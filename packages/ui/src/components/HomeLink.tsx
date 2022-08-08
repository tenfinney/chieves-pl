import { LinkedSVG } from '@/components'
import React from 'react'

export const HomeLink: React.FC = () => (
  <LinkedSVG
    href="/"
    svg="../favicon.svg"
    h="3rem"
    w="2rem"
    position="fixed"
    left="0.25rem"
    top="0.25rem"
  />
)

export default HomeLink