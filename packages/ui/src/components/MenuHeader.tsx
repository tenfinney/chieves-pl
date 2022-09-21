import {
  Box,
  Flex,
  FlexProps,
  Tooltip,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LinkedSVG } from '@/components'


// font-family: 'Anek Devanagari, sans-serif';
// font-family: 'Anek Latin, sans-serif';
// font-family: 'Anton, sans-serif';
// font-family: 'Arizonia, cursive';
// font-family: 'Encode Sans Semi Condensed, sans-serif';
// font-family: "Exo 2, sans-serif";
// font-family: 'Georama, sans-serif';
// font-family: 'League Gothic, sans-serif';
// font-family: 'Orbitron, sans-serif';
// font-family: 'Oxanium, cursive';
// font-family: 'Russo One, sans-serif';


import React from 'react'

export const MenuHeader: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <Box p={3} bg="black">
    <Flex
      w="full"
      align="start"
      justify="center"
      minH="20vh"
      id="what"
      gap={10}
      pt={20}
    >
      {!isSmallScreen && <Image src="/Landing/Circles.png" alt="circles" />}

      <Flex
        display="flex"
        flexDirection="column"
        justify="baseline"
        maxWidth={{ base: '90%', md: '5xl' }}
        lineHeight={{ base: 'lg', '2xl': '2xl' }}
        pl={{ base: 0, md: 0 }}
        zIndex={100}
        fontWeight="normal"
        color="white"
        alignItems={{ base: 'center', md: 'initial' }}
      >
        {isSmallScreen && (
          <Image src="/Landing/Circles.png" alt="circles" width={20} mb={8} />
        )}
        <Heading
          fontSize={{ base: 36, md: 70 }}
          pb={10}
          fontWeight="normal"
          display="flex"
          color="white"
          alignItems={{ base: 'center', md: 'initial' }}
          textAlign={{ base: 'center', md: 'initial' }}
        >
          <Text fontFamily="Exo 2, sans-serif">
            
            <span style={{ color: '#03a5fc' }}>SmartLaw</span> Tokens & Digital Assets
          </Text>
        </Heading>
        <Text fontSize={{ base: 'md', md: '3xl' }} px={{ base: 8, md: 0 }}>
          You should have a lot to say here. So do it.
        </Text>
      </Flex>
    </Flex>
    </Box>
  );
};


export default MenuHeader