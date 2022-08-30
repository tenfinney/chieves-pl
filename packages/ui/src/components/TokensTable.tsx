import {
  Box, Flex, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr,
  Link as ChakraLink, Tooltip, chakra, type TableCellProps,
} from '@chakra-ui/react'
import { extractMessage, httpURL, regexify } from '@/lib/helpers'
import type { TokenState } from '@/lib/types'
import Markdown from 'react-markdown'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

const RouterLink = chakra(ReactRouterLink)

type IndexedToken = { token: TokenState, index: number }
type Token = { token: TokenState }

const IdTd:React.FC<IndexedToken> = ({ token }) => (
  <Td>
    <Tooltip
      label={token.id != null ? (
        regexify(token.id)
      ) : (
        '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'
      )}
    >
      <Stack>
        <Text>{token.index}</Text>
        {token.gates != null && (
          <Text title={`Controls Token #${token.gates}`}>
            ({token.gates === 0 ? 'all' : token.gates})
          </Text>
        )}
        {token.is?.disabling && (
          <Text>(disabled)</Text>
        )}
      </Stack>
    </Tooltip>
  </Td>
)

const ErrorTd:React.FC<Token> = ({ token }) => (
  <Td colSpan={4}>
    <Flex justify="center">
      <Text color="cyan" fontStyle="italic">
        {extractMessage(token.error)}
      </Text>
    </Flex>
  </Td>
)

const LoadingTd:React.FC<
  Token & { label?: string } & TableCellProps
> = (
  ({ token, label = 'Loading Metadata…', ...props }) => (
    <Td {...props}>
      <Flex justify="center">
        <Spinner thickness="4px"/>
        <Text ml={3}>{label}</Text>
      </Flex>
    </Td>
  )
)

const ImageTd:React.FC<Token> = ({ token }) => (
  <Td>
    <Stack>
      <RouterLink to={`/view/${regexify(token.id)}`}>
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
            <chakra.object
              data={httpURL(token.metadata.image) ?? undefined}
              title={token.metadata?.name ?? 'Untitled'}
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
      </RouterLink>
    </Stack>
  </Td>
)

const DescriptionTd:React.FC<Token> = ({ token }) => (
  <Td
    flexGrow={1}
    sx={{ a: { textDecoration: 'underline' } }}
  >
    <Markdown linkTarget="_blank">
      {token.metadata?.description ?? (
        '*No Description*'
      )}
    </Markdown>
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
        🔗
        </Tooltip>
      </ChakraLink>
    )}
  </Td>
)

const URITd:React.FC<Token> = ({ token }) => (
  <Td>
    {token.uri && (
      <Flex justify="center" fontSize="150%">
        <ChakraLink href={httpURL(token.uri) ?? undefined} isExternal>
          <Tooltip label={token.uri} hasArrow>
          👑
          </Tooltip>
        </ChakraLink>
        <ChakraLink
          ml={2}
          onClick={() => {
            if(
              token.uri
              && typeof navigator !== 'undefined'
              && window.isSecureContext
            ) {
              navigator.clipboard?.writeText(token.uri)
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
  <Td>
    <RouterLink to={`/owners/${token.id}`}>
      {token.total == null ? (
        <Spinner/>
      ) : (
        `${token.total} ⁄ ${token.max}`
      )}
    </RouterLink>
  </Td>
)

const ActionsTd:React.FC<Token> = ({ token }) => {
  const id = regexify(token.id)

  return (
    <Td>
      <Flex justify="center" fontSize="150%">
        <RouterLink to={`/edit/${id}`}>
          <Tooltip label="Edit Metadata" hasArrow>
            ✏️
          </Tooltip>
        </RouterLink>
        <RouterLink ml={2} to={`/view/${id}`}>
          <Tooltip label="View This NFT" hasArrow>
            👁
          </Tooltip>
        </RouterLink>
        <RouterLink ml={2} to={`/disburse/${id}`}>
          <Tooltip label="Disburse This NFT" hasArrow>
            💸
          </Tooltip>
        </RouterLink>
      </Flex>
    </Td>
  )
}

export const TokensTable: React.FC<{
  tokens: Array<TokenState | Error>
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
          <Th>Token Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens.map((token: TokenState, index) => {
          if(token.is?.hidden) {
            return null
          }
          return (
            <Tr key={index}>
              <IdTd {...{ token, index }}/>
              {(() => {
                if(!token.uri && token.error) {
                  return <ErrorTd {...{ token }}/>
                }
                if(!token.metadata) {
                  return (
                    <LoadingTd
                      colSpan={token.uri ? 3 : 4}
                      label={`${token.uri ? 'Loading' : 'Finding'} Metadata…`}  
                      {...{ token }}
                    />
                  )
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
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TokensTable