import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';


import React from 'react'

export const Creators: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (    
  
    <VStack
      w="full"
      align="center"
      justify="center"
      minH="100vh"
      pos="relative"
      pt={20}
      gap={{ base: 10, md: 60 }}
    >
      <Box
        position="absolute"
        borderRadius="full"
        left="-400px"
        top="-200px"
        height="600px"
        filter="blur(484px)"
        width="600px"
        background="#03a5fc"
        zIndex={-3}
      />
      {isSmallScreen && (
        <Box h="338px" gridArea="creators" px={12}>
          <Heading
            color="white"
            fontSize={{ base: 36, md: 70 }}
            mb={8}
            textAlign={{ base: 'center', md: 'initial' }}
          >
            Team Building
          </Heading>
          <Box>
            <Text color="gray.100" >The permissions of creator roles are cascading.</Text>
            <Text fontFamily="Exo 2, sans-serif">
              This means the owners have all permissions of admins, admins have
              all permissions of editors and editors have all permissions of
              reviewers.
            </Text>
            <Text fontFamily="Exo 2, sans-serif">
              Owners can add and remove other owners, admins, editors and
              reviewers. Admins can add and remove editors and reviewers.
            </Text>
          </Box>
        </Box>
      )}
      <Grid
        display={{ base: 'initial', md: 'grid' }}
        gap={{ base: 3, md: 0 }}
        id="creators"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: '265px 265px 265px 265px',
        }}
        templateRows="auto"
        templateAreas={{
          md: `
            "creators creators creators reviewers"
            "owner q editors empty"
            "empty1 admins empty2 empty2"
          `,
        }}
      >
        {!isSmallScreen && (
          <Box h="338px" gridArea="creators" pr={12}>
            <Heading color="white" fontSize={70} mb={6}>
              Create & Manage
            </Heading>
            <Text color="gray.100" display="flex">
              The permissions of creator roles are{' '}
              <span style={{ color: '#03a5fc', marginLeft: 4 }}>cascading</span>
              .
            </Text>
            <Text color="gray.100" fontFamily="Exo 2, sans-serif">
              This means the owners have all permissions of admins, admins have
              all permissions of editors and editors have all permissions of
              reviewers.
            </Text>
            <Text color="gray.100" fontFamily="Exo 2, sans-serif">
              Owners can add and remove other owners, admins, editors and
              reviewers. Admins can add and remove editors and reviewers.
            </Text>
          </Box>
        )}
        <Box
          dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          bgImage="url(/Landing/Card4.svg)"
          bgPosition="center"
          bgSize="contain"
          backgroundRepeat="no-repeat"
          p={6}
          textAlign="center"
          h="338px"
          gridArea="reviewers"
        >
          <Heading color="white" fontSize={{ base: 28, md: 40 }} mb={6}>
            Reviewers
          </Heading>
          <Text
            mb={4}
            fontSize={{ base: 'lg', md: '3xl' }}
            maxW={{ base: '220px', md: 'full' }}
          >
            ♢ can{' '}
            <span style={{ color: '#03a5fc' }}>
              accept or reject submitted proof
            </span>{' '}
            of quest completion
          </Text>
        </Box>

        <Box
          dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          bgImage="url(/Landing/Card1.svg)"
          bgPosition="center"
          bgSize="contain"
          backgroundRepeat="no-repeat"
          p={6}
          textAlign="center"
          h="338px"
          gridArea="owner"
        >
          <Heading color="white" fontSize={{ base: 28, md: 40 }} mb={3}>
            Owner/s
          </Heading>
          <Text
            fontFamily="Exo 2, sans-serif"
            mb={4}
            fontSize={{ base: 'lg', md: '3xl' }}
            maxW={{ base: '220px', md: 'full' }}
          >
            ♢ creator of the quest chain,{' '}
            <span style={{ color: '#03a5fc' }}>has all permissions</span>
          </Text>
        </Box>
        {!isSmallScreen && (
          <Flex
            dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            p={6}
            textAlign="center"
            h="338px"
            gridArea="q"
          >
            <Image src="/Landing/group.svg" alt="circles3" mr={10} />
          </Flex>
        )}
        <Box
          dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          bgImage="url(/Landing/Card3.svg)"
          bgPosition="center"
          bgSize="contain"
          backgroundRepeat="no-repeat"
          p={6}
          textAlign="center"
          h="338px"
          gridArea="editors"
        >
          <Heading color="white" fontSize={{ base: 28, md: 40 }} mb={3}>
            Editors
          </Heading>
          <Text
            mb={4}
            fontSize={{ base: 'lg', md: '3xl' }}
            maxW={{ base: '220px', md: 'full' }}
          >
            ♢ can <span style={{ color: '#03a5fc' }}>create and edit</span>{' '}
            quests. Can disable and enable them as well.
          </Text>
        </Box>
        <Box gridArea="empty" />

        <Box gridArea="empty1" />
        <Box
          dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          bgImage="url(/Landing/Card2.svg)"
          bgPosition="center"
          bgSize="contain"
          backgroundRepeat="no-repeat"
          p={6}
          textAlign="center"
          h="338px"
          gridArea="admins"
        >
          <Heading color="white" fontSize={{ base: 28, md: 40 }} mb={3}>
            Admins
          </Heading>
          <Text
            mb={4}
            fontSize={{ base: 'lg', md: '3xl' }}
            maxW={{ base: '220px', md: 'full' }}
          >
            ♢ can <span style={{ color: '#03a5fc' }}> create and edit</span>{' '}
            quest chains and quests
          </Text>
        </Box>
        <Box gridArea="empty2" />
      </Grid>
      <Flex w="full" pos="relative" justifyContent="center" mt={40}>
        {!isSmallScreen && (
          <Image
            src="/Landing/tokensId.svg"
            position="absolute"
            left="0"
            top="-400px"
            alt="turbine"
          />
        )}

        <Box
          id="questers"
          background={{
            base: 'none',
            md: 'radial-gradient(100% 100% at 100% 71%, rgba(255, 255, 255, 0.14) 17%, rgba(255, 255, 255, 0) 100%)',
          }}
          backdropFilter={{ base: 'none', md: 'blur(20px)' }}
          border={{ base: 'none', md: '1px solid #03a5fc' }}
          borderRadius={{ base: 'none', md: '29.8157px' }}
          w="80%"
          h={{ base: 'initial', md: '528px' }}
          textAlign="center"
          p={{ base: 0, md: 24 }}
          mb={{ base: 24, md: 0 }}
        >
          <Heading color="gray.100" fontSize={{ base: 20, md: 50 }} mb={12}>
            Team Buildingx
          </Heading>
          <Text color="gray.100" mb={6} fontSize={{ base: 'lg', md: '3xl' }}>
            ♢ can complete quest chains by submitting proof of completion for
            quests
          </Text>
          <Text color="gray.100" fontSize={{ base: 'lg', md: '3xl' }}>
            ♢ able to mint an NFT after successfully completing all of the
            quests of a quest chain
          </Text>
        </Box>
      </Flex>
    </VStack>
);
};

export default Creators