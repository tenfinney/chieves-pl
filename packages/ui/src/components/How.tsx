import {
  Box,
  Flex,
  HStack,
  FlexProps,
  Tooltip,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LinkedSVG } from '@/components'


import React from 'react'

export const How: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (    
  
  <HStack
    w="full"
    align="center"
    justify="center"
    minH={{ base: '50vh', md: '70vh' }}
    bg="dark"
    bgPosition="center"
    bgAttachment="fixed"
    bgSize="cover"
    position="relative"
    id="how"
  >
    <Box
      position="absolute"
      borderRadius="full"
      right="-300px"
      top="-300px"
      height="600px"
      filter="blur(484px)"
      width="600px"
      background="#03a5fc"
      zIndex={-3}
    />
    <Flex
      display="flex"
      flexDirection="column"
      justifyContent="center"
      lineHeight={{ base: 'lg', '2xl': '2xl' }}
      pl={0}
      marginInlineStart="0 !important"
      zIndex={100}
      fontWeight="normal"
      color="white"
    >
      <Flex
        align="center"
        mb={{ base: 0, md: 8 }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        {!isSmallScreen && (
          <Image src="/Landing/Circles3.png" alt="circles3" mr={10} />
        )}
        <Heading
          color="main"
          fontSize={{ base: 36, md: 79 }}
          pb={10}
          fontWeight="normal"
          display="flex"
          flexDir="column"
          textAlign={{ base: 'center', md: 'initial' }}
        >
          How? <Text color="white"></Text>
        </Heading>
      </Flex>
      <Flex align="center" mb={10}>
        <Flex
          flexDir="column"
          fontSize={{ base: 'md', md: '3xl' }}
          ml={{ base: 0, md: 20 }}
          px={{ base: 12, md: 0 }}
        >
          <Text>
            ...
          </Text>
          <Text>
            Show the world the
            <Link
              w="100%"
              href="https://vitalik.ca/general/2022/01/26/soulbound.html"
              _hover={{
                textDecor: 'none',
                bg: 'whiteAlpha.200',
              }}
              isExternal
              borderRadius="full"
              px={2}
            >
              <span style={{ color: '#03a5fc' }}>this</span>
            </Link>
            collection!
          </Text>
          <Flex alignSelf={{ base: 'center', md: 'auto' }}>
            {!isSmallScreen && (
              <Image
                src="/Landing/NFTs/NFT1.png"
                alt="NFT1"
                title="NFT1"
                height="20rem"
              />
            )}
            {!isSmallScreen && (
              <Image
                src="/Landing/NFTs/NFT2.png"
                alt="NFT2"
                title="NFT2"
                height="20rem"
              />
            )}
            <Image
              src="/Landing/NFTs/NFT3.png"
              alt="NFT3"
              title="NFT3"
              height="20rem"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </HStack>
);
};

export default How