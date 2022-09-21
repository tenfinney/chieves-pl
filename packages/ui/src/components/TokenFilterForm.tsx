import { toSpanList } from '@/lib/helpers'
import { Limits } from '@/lib/types'
import {
  chakra, Button, Checkbox, Flex, FormControl,
  FormLabel, Input, Stack, type FlexProps, Text,
} from '@chakra-ui/react'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import { Header } from 'components'
// import { Header0 } from 'components'
import { Header1 } from 'components'
import { Header2 } from 'components'
import { Header3 } from 'components'
import { HeaderLogo } from 'components'

export type FilterValues = {
  limit: number
  offset: number
  visible: string
  gatingVisible: boolean
}

export const TokenFilterForm: React.FC<{
  limit: number
  setLimit: (limit: SetStateAction<number>) => void
  offset: number
  setOffset: (offset: SetStateAction<number>) => void
  gatingVisible: boolean
  setGatingVisible: (gatingVisible: SetStateAction<boolean>) => void
  setVisibleList: (visible: SetStateAction<Array<number | Limits>>) => (
    void
  )
  visibleList: Array<number | Limits> 
} & FlexProps> = ({
  limit = 10, setLimit, offset = 0, setOffset,
  gatingVisible = false, setGatingVisible,
  visibleList, setVisibleList, ...props
}) => {
  const {
    register, handleSubmit, control, setValue,
  } = useForm<FilterValues>()

  useEffect(() => {
    setValue('limit', limit)
    setValue('offset', offset)
    setValue('visible', visibleList.toString())
    setValue('gatingVisible', gatingVisible)
  }, [limit, offset, visibleList, gatingVisible, setValue])

  const submit = async (data: FilterValues) => {
    setLimit(Number(data.limit))
    setOffset(Number(data.offset))
    setGatingVisible(data.gatingVisible)
    setVisibleList(toSpanList(data.visible))
  }

  return (
    <Stack align="center">

    <Flex
      as="form" onSubmit={handleSubmit(submit)}
      mt={10} mb="1rem" maxW={['100%', 'min(85vw, 50em)']}
      direction={['column', 'row']}
      sx={{ a: { textDecoration: 'underline' } }}
      {...props}
    >
            <Header1/>
      <HeaderLogo/>
      <Header2/>
      <Header3/>
      <Header1/>
      <Text fontSize="24pt" mt="1rem" fontWeight="bold">
        ERC-1155 Access and Achievment Token Minting
      </Text>
      <Text ml="20px" fontSize="18pt" fontWeight="bold">
        Digital Tokens on the Polygon EVM Blockchain using IPFS
      </Text>
      <Text ml="50px" fontSize="12pt" fontWeight="regular">
        Each token reservation mints one (1) master token and up to (11) role
        tokens. Superuser, Minter, Caster, Transferer, Configurer, Maintainer, Creator, Limiter, Burner, Destroyer, and/or Oracle can be automatically minted with
        the master token and can be assigned to third-parties for
        administration.
      </Text>
      <Stack
        flexGrow={1}
        sx={{
          '&>*:not(style)~*:not(style)': { mt: 0.5 },
          label: {
            _after: { content: '":"' },
            mt: 1.5,
            mr: 1,
            fontSize: '110%',
          },
        }}
      >
        <FormControl>
          <Flex align="center">
            <FormLabel>Limit</FormLabel>
            <Input
              type="number"
              placeholder="Number of tokens to display."
              {...register('limit')}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex align="center">
            <FormLabel>Offset</FormLabel>
            <Input
              type="number"
              placeholder="Number of tokens offset from Token 1."
              {...register('offset')}
            />
          </Flex>
        </FormControl>
        <Text textAlign="center">or</Text>
        <FormControl>
          <Flex align="center">
            <FormLabel>Visible&#xA0;List</FormLabel>
            <Input
              placeholder="Comma, space and dash separated list of indices."
              {...register('visible')}
            />
          </Flex>
        </FormControl>
      </Stack>
      <Stack ml={3}>
        <FormControl>
          <Flex align="center" my={1}>
            <Controller
              control={control}
              name="gatingVisible"
              defaultValue={gatingVisible}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  ref={ref}
                  isChecked={value}
                >
                  View<chakra.br/>Permission<chakra.br/>Tokens
                </Checkbox>
              )}
            />
          </Flex>
        </FormControl>

        <Button type="submit" colorScheme="purple">
          View
        </Button>
      </Stack>
    </Flex>
      </Stack>

  )
}

export default TokenFilterForm
