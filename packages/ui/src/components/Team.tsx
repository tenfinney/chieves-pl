import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  Avatar,
  Grid,
  Link as ChakraLink,
  Link,
} from '@chakra-ui/react';


import React from 'react'

export const Team: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (    
  
    <HStack
      w="full"
      align="center"
      justify="center"
      minH={{ base: 'full', md: '80vh' }}
      bg="dark"
      bgPosition="center"
      bgAttachment="fixed"
      bgSize="cover"
      id="team"
    >
      <Flex
        display="flex"
        flexDirection="column"
        lineHeight={{ base: 'lg', '2xl': '2xl' }}
        pl={{ base: 0, md: 0 }}
        marginInlineStart="0 !important"
        zIndex={100}
        w="full"
        fontWeight="normal"
        color="white"
      >
        <Flex align="center" mb={10} flexDir="column">
          <Heading
            color="main"
            fontSize={{ base: 36, md: 79 }}
            pb={4}
            fontWeight="normal"
            display="flex"
          >
            Brought to you by:
          </Heading>

          <Flex mb={8}>
            <Link
              href="https://github.com/tenfinney"
              isExternal
              borderRadius="full"
              mx={4}
            >
              <Image
                src="/Landing/contact/discord.png"
                alt="discord"
                height={14}
              />
            </Link>
            <Link
              href="https://https://github.com/tenfinney"
              isExternal
              borderRadius="full"
              mx={4}
            >
              <Image
                bg="white"
                src="/Landing/contact/github.png"
                alt="github"
                height={14}
              />
            </Link>
            <Link
              href="https://mobile.twitter.com/tenfinney"
              isExternal
              borderRadius="full"
              mx={4}
            >
              <Image
                src="/Landing/contact/twitter.png"
                alt="twitter"
                height={14}
              />
            </Link>
          </Flex>
          <Grid
            gap={8}
            // display={{ base: 'flex', md: 'grid' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
            height={{ base: 'initial', md: '20rem' }}
          >
                        <Flex
              flexDir="column"
              alignItems="center"
              background="linear-gradient(transparent, rgba(45, 248, 199, 0.2))"
              p={8}
              borderRadius={12}
            >
              <Avatar
                name="Web3LegalEngineering"
                src="/Landing/profile/dysbulic.png"
                size="2xl"
                showBorder
                borderColor="main"
              />
              <Text
                fontWeight="bold"
                mt={3}
                fontSize="lg"
                fontFamily="heading"
                mb={2}
              >
                Dysbulic
              </Text>
              <Text marginBottom="auto" fontSize="sm">
                MetaGame Builder Champion
              </Text>

              <Flex alignItems="center" justifyContent="center" gap={2}>
              <ChakraLink
                  href="https://github.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/github.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://www.linkedin.com/in/scott-stevenson-jd/"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/linkedin.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://twitter.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/twitter.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              background="linear-gradient(transparent, rgba(45, 248, 199, 0.2))"
              p={8}
              borderRadius={12}
            >
              <Avatar
                name="Scott"
                src="/Landing/profile/ethereans-02893-t-hex-B4D-tr-400w.png"
                size="2xl"
                showBorder
                borderColor="main"
                background="black"
              />
              <Text
                fontWeight="bold"
                mt={3}
                fontSize="lg"
                fontFamily="heading"
                mb={2}
              >
                Web3 Legal Engineering
              </Text>
              <Text marginBottom="auto" fontSize="sm">
                Metaverse Services
              </Text>

              <Flex alignItems="center" justifyContent="center" gap={2}>
                <ChakraLink
                  href="https://github.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/github.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://www.linkedin.com/in/scott-stevenson-jd/"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/linkedin.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://twitter.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/twitter.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
              </Flex>
            </Flex>


            <Flex
              flexDir="column"
              alignItems="center"
              background="linear-gradient(transparent, rgba(45, 248, 199, 0.2))"
              p={8}
              borderRadius={12}
            >
              <Avatar
                name="Web3LegalEngineering"
                src="/Landing/profile/ss-03-400w2.png"
                size="2xl"
                showBorder
                borderColor="main"
              />
              <Text
                fontWeight="bold"
                mt={3}
                fontSize="lg"
                fontFamily="heading"
                mb={2}
              >
                Scott Stevenson JD
              </Text>
              <Text marginBottom="auto" fontSize="sm">
                Web3 Applications
              </Text>

              <Flex alignItems="center" justifyContent="center" gap={2}>
              <ChakraLink
                  href="https://github.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/github.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://www.linkedin.com/in/scott-stevenson-jd/"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/linkedin.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
                <ChakraLink
                  href="https://twitter.com/tenfinney"
                  isExternal
                  borderRadius="full"
                >
                  <Image
                    src="/Landing/contact/twitter.png"
                    alt="ipfs"
                    height={6}
                  />
                </ChakraLink>
              </Flex>
            </Flex>



          </Grid>
        </Flex>
        
      </Flex>
      
    </HStack>
  );
};


export default Team