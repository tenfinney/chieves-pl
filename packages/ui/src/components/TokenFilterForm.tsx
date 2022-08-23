import { toSpanList } from '@/lib/helpers'
import { Limits } from '@/lib/types'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
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
}> = ({
  limit = 10, setLimit, offset = 0, setOffset,
  gatingVisible = false, setGatingVisible,
  setVisibleList
}) => {
  const [visible, setVisible] = useState(null)
  const {
    register, handleSubmit, control, setValue,
  } = useForm<FilterValues>()
  const submit = async (data: FilterValues) => {
    setLimit(Number(data.limit))
    setOffset(Number(data.offset))
    setGatingVisible(data.gatingVisible)
    setVisible(data.visible)
    setVisibleList(toSpanList(data.visible))
  }

  useEffect(() => {
    setValue('limit', limit)
    setValue('offset', offset)
    setValue('visible', visible)
    setValue('gatingVisible', gatingVisible)
  }, [limit, offset, visible, gatingVisible, setValue])

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(submit)}
      mt={10}
      ml={20}
      mb="1rem"
      maxW={['100%", "min(85vw, 50em)']}
      sx={{ a: { textDecoration: 'underline' } }}
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
      <br />
      <hr/>
      <br />
      <FormControl>
        <Flex align="center" my={1}>
          <Controller
            control={control}
            name="gatingVisible"
            defaultValue={gatingVisible}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                View&#xA0;Permission&#xA0;Tokens
              </Checkbox>
            )}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" maxW="200px" my={4}>
          <FormLabel _after={{ content: '":"' }}>Limit</FormLabel>
          <Input
            type="number"
            placeholder="Number of tokens to display."
            {...register('limit')}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" maxW="200px" my={4}>
          <FormLabel _after={{ content: '":"' }}>Offset</FormLabel>
          <Input
            type="number"
            placeholder="Number of tokens offset from Token 1."
            {...register('offset')}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" maxW="600px" my={1}>
          <FormLabel _after={{ content: '":"' }}>Visible&#xA0;List</FormLabel>
          <Input
            placeholder="Comma, space and dash separated list of indices."
            {...register('visible')}
          />
        </Flex>
      </FormControl>

      <Button type="submit">
        View
      </Button>
    </Box>
  )
}

export default TokenFilterForm
