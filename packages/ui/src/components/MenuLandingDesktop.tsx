import {
  Link as ChakraLink,
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  HStack,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from 'react-scroll';


import React from 'react'

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



export const MenuLandingDesktop: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (    
    <HStack>

      
    {/* <NextLink href="/new" passHref>
      <ChakraLink display="block" _hover={{}}>
        <Button fontSize={20} cursor="pointer" fontFamily="headingLight">
          Enter App
        </Button>
      </ChakraLink>
    </NextLink> */}




<Link activeClass="active" to="how" spy={true} smooth={true} duration={500}>
      <Text fontSize={20} ml={3} color="white" cursor="pointer" fontFamily="Exo 2, sans-serif">
        How to
      </Text>
    </Link>
    


      <Link
      activeClass="active"
      to="go-to-app"
      spy={true}
      smooth={true}
      duration={500}
    >
      <Text fontSize={20} ml={3} color="white" cursor="pointer" fontFamily="Exo 2, sans-serif">
        Query
      </Text>
    </Link>


    <Link
      activeClass="active"
      to="go-to-app"
      spy={true}
      smooth={true}
      duration={500}
    >
      <Text fontSize={20} ml={3} color="white" cursor="pointer" fontFamily="Exo 2, sans-serif">
        Create
      </Text>
    </Link>




    <Link
      activeClass="active"
      to="creators"
      spy={true}
      smooth={true}
      duration={500}
      offset={-110}
    >
      <Text fontSize={20} ml={3} color="white" cursor="pointer" fontFamily="Exo 2, sans-serif">
        Admin
      </Text>
    </Link>
    <Link
      activeClass="active"
      to="team"
      spy={true}
      smooth={true}
      duration={500}
    >
      <Text fontSize={20} ml={3} color="white" cursor="pointer" fontFamily="Exo 2, sans-serif">
        Contact
      </Text>
    </Link>
  </HStack>
);
}


export default MenuLandingDesktop