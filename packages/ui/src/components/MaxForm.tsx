import { useWeb3 } from '@/lib/hooks'
import { Maybe } from '@/lib/types'
import {
  Flex, FormControl, FormLabel, Input,
  Spinner, Text, useToast
} from '@chakra-ui/react'
import React, {
  ChangeEvent, FormEvent, useCallback, useEffect, useState
} from 'react'
import { SubmitButton } from './SubmitButton'
import { ButtonProps } from '@chakra-ui/react'
import { extractMessage } from '@/lib/helpers'

export const MaxForm = (
  { tokenId, purpose = 'create', ...props }:
  ButtonProps & {
    tokenId?: string
    purpose: string
  }
) => {
  const [max, setMax] = useState<Maybe<number>>(null)
  const [processing, setProcessing] = useState(false)
  const { roContract, rwContract } = useWeb3()
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      if(roContract && tokenId) {
        setMax(await roContract.getMax(BigInt(tokenId)))
      }
    }
    load()
  }, [tokenId, roContract])
  
  const save = useCallback(async (evt: FormEvent) => {
    evt.preventDefault()

    if (!rwContract) {
      throw new Error('`rwContract` is not defined')
    }
    try {
      setProcessing(true)
      const tx = await rwContract.setMax(tokenId, max)
      await tx.wait()
    } catch(error) {
      toast({
        title: 'Contract Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    } finally {
      setProcessing(false)
    }
  }, [max, rwContract, toast, tokenId])

  return (
    <Flex 
      as="form"
      onSubmit={save}
      alignItems="flex-end"
    >
      <FormControl display="flex" w="auto" alignItems="baseline" mt={3}>
        <FormLabel whiteSpace="pre" _after={{ content: '":"' }}>
          Maximum Mintable
        </FormLabel>
        {max == null ? (
          <Flex>
            <Spinner/>
            <Text ml={3}>Loading…</Text>
          </Flex>
        ) : (
          <Input
            type="number"
            mx={{ base: 0, md: 4 }}
            w={32}
            textAlign="center"
            value={max}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              setMax(Number(value))
            }}
          />
        )}  
      </FormControl>
      <SubmitButton
        label="Set Max"
        {...{ purpose, processing, ...props }}
      />
    </Flex>
)
}