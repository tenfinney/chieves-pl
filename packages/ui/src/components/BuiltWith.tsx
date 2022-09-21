import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  Grid,
} from "@chakra-ui/react";
import { Link } from "react-scroll";

// import { SUPPORTED_NETWORK_INFO } from '@/web3/networks';

import React from "react";

export const BuiltWith: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <Box color="white" p={3} bg="black">
    <HStack
      w="full"
      align="center"
      justify="center"
      minH={{ base: "40vh", md: "20vh" }}
      bg="dark"
      bgPosition="center"
      bgAttachment="fixed"
      bgSize="cover"
      position="relative"
    >
      <Box
        position="absolute"
        borderRadius="full"
        right="-300px"
        top="-300px"
        height="200px"
        filter="blur(484px)"
        width="400px"
        background="#03a5fc"
        zIndex={-3}
      />
      <Flex
        display="flex"
        flexDirection="column"
        justifyContent="center"
        lineHeight={{ base: "lg", "2xl": "2xl" }}
        pl={{ base: 0, md: 0 }}
        marginInlineStart="0 !important"
        zIndex={100}
        w="full"
        fontWeight="normal"
        color="white"
      >
        <Grid
          mb={20}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        >
          {!isSmallScreen && (
            <Image src="/Landing/Circles5.png" alt="circles3" mr={10} />
          )}
          <Flex flexDir="column" mr={{ base: 0, md: 20 }}>
            <Heading
              color="main"
              fontSize={{ base: 18, md: 60 }}
              pb={10}
              pt={{ base: 10, md: 0 }}
              fontWeight="normal"
              display="flex"
              alignSelf="center"
            >
              <Text color="cyan" ml={10}>
                Polygon
              </Text>
            </Heading>
          </Flex>

          <Flex flexDir="column">
          <Heading
              color="main"
              fontSize={{ base: 10, md: 30 }}
              pb={0}
              pt={{ base: 10, md: 0 }}
              fontWeight="normal"
              display="flex"
              flexDir="column"
              alignSelf="center"
            >
              <Text color="white">with</Text>
            </Heading>
            <Heading
              color="main"
              fontSize={{ base: 18, md: 60 }}
              pb={10}
              pt={{ base: 10, md: 0 }}
              fontWeight="normal"
              display="flex"
              flexDir="column"
              alignSelf="center"
            >
              <Text color="white">IPFS</Text>
            </Heading>
          </Flex>
        </Grid>
      </Flex>
      <Link to="back-to-top" spy={true} smooth={true} duration={800}>
        <Image
          src="/Landing/Up.svg"
          alt="up"
          mr={10}
          pos="absolute"
          right={{ base: 4, md: 50 }}
          bottom={{ base: 5, md: 20 }}
          cursor="pointer"
        />
      </Link>
    </HStack>
    </Box>
  );
};

export default BuiltWith;
