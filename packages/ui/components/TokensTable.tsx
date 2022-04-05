import { Box, Flex, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, Link as ChakraLink, Image, Tooltip } from '@chakra-ui/react'
import { httpURL } from 'lib/helpers'
import { TokenState } from 'lib/types'
import NextLink from 'next/link'
import Markdown from 'react-markdown'

type Token = { token: TokenState }

const IdTd:React.FC<Token> = ({ token }) => (
  <Td>{token.id}</Td>
)

const ErrorTd:React.FC<Token> = ({ token }) => (
  <Td colSpan={4}>
    <Flex justify="center">
      <Text color="red" fontStyle="italic">
        {token.error}
      </Text>
    </Flex>
  </Td>
)

const LoadingTd:React.FC<Token> = ({ token }) => (
  <Td colSpan={3}>
    <Flex justify="center">
      <Spinner thickness="4px"/>
      <Text ml={3}>Loading Metadata…</Text>
    </Flex>
  </Td>
)

const ImageTd:React.FC<Token> = ({ token }) => (
  <Td>
    <Stack>
      <NextLink href={`/view/${token.id}`} passHref>
        <ChakraLink>
          <Box
            bg={
              token.metadata?.background_color ? (
                `#${token.metadata.background_color}`
              ) : (
                'transparent'
              )
            }
          >
            {token.metadata?.image && (
              <Image
                src={httpURL(token.metadata.image)}
                alt={token.metadata?.name ?? 'Untitled'}
                maxW={32}
                maxH={32}
                objectFit="contain"
                margin="auto"
              />
            )}
          </Box>
          <Text>{token.metadata?.name ?? (
            <Text as="em">Untitled</Text>
          )}</Text>
        </ChakraLink>
      </NextLink>
    </Stack>
  </Td>
)

const DescriptionTd:React.FC<Token> = ({ token }) => (
  <Td
    flexGrow={1}
    sx={{ a: { textDecoration: 'underline' } }}
  >
    <Markdown>{token.metadata?.description ?? (
      '*No Description*'
    )}</Markdown>
  </Td>
)

const LinkTd:React.FC<Token> = ({ token }) => (
  <Td>
    {token.metadata?.external_url && (
      <ChakraLink
        href={token.metadata.external_url}
        isExternal
        fontSize="150%"
      >
        <Tooltip label={token.metadata.external_url} hasArrow>
          🌐
        </Tooltip>
      </ChakraLink>
    )}
  </Td>
)

const URITd:React.FC<Token> = ({ token }) => (
  <Td>
    {token.uri && (
      <Flex justify="center" fontSize="150%">
        <ChakraLink href={httpURL(token.uri)} isExternal>
          <Tooltip label={token.uri} hasArrow>
            🔗
          </Tooltip>
        </ChakraLink>
        <ChakraLink
          ml={2}
          onClick={() => {
            if(token.uri) {
              navigator.clipboard.writeText(token.uri)
            }
          }}
        >
          <Tooltip label="Copy to Clipboard" hasArrow>
            📋
          </Tooltip>
        </ChakraLink>
      </Flex>
    )}
  </Td>
)

const TotalTd:React.FC<Token> = ({ token }) => (
  <Td>{token.total?.toString() ?? <Spinner/>}</Td>
)

const ActionsTd:React.FC<Token> = ({ token }) => (
  <Td>
    <Flex justify="center" fontSize="150%">
      <NextLink href={`/edit/${token.id}`} passHref>
        <ChakraLink>
          <Tooltip label="Edit Metadata" hasArrow>
            ✏️
          </Tooltip>
        </ChakraLink>
      </NextLink>
      <NextLink href={`/view/${token.id}`} passHref>
        <ChakraLink ml={2}>
          <Tooltip label="View This NFT" hasArrow>
            👁
          </Tooltip>
        </ChakraLink>
      </NextLink>
      <NextLink href={`/disberse/${token.id}`} passHref>
        <ChakraLink ml={2}>
          <Tooltip label="Disberse This NFT" hasArrow>
            💸
          </Tooltip>
        </ChakraLink>
      </NextLink>
    </Flex>
  </Td>
)

export const TokensTable: React.FC<{
  tokens: Array<TokenState>
}> = ({ tokens }) => {
  return (
    <Table
      sx={{
        'th, td': { textAlign: 'center' },
        a: { borderBottom: '2px dotted transparent' },
        'a:hover': {
          textDecoration: 'none',
          borderBottom: '2px dotted',
        },
      }}
    >
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Display</Th>
          <Th flexGrow={1}>Description</Th>
          <Th>Link</Th>
          <Th>Metadata</Th>
          <Th>Total</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens.map((token: TokenState) => (
          <Tr key={token.id}>
            <IdTd {...{ token }}/>
            {(() => {
              if(!token.uri && token.error) {
                return <ErrorTd {...{ token }}/>
              }
              if(!token.metadata) {
                return <LoadingTd {...{ token }}/>
              }
              return (
                <>
                  <ImageTd {...{ token }}/>
                  <DescriptionTd {...{ token }}/>
                  <LinkTd {...{ token }}/>
                </>
              )
            })()}
            {token.uri && <URITd {...{ token }}/>}
            <TotalTd {...{ token }}/>
            <ActionsTd {...{ token }}/>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default TokensTable