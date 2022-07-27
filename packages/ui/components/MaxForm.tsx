import { useWeb3 } from "@/lib/hooks"
import { Maybe } from "@/lib/types"
import { Button, Flex, FormControl, FormLabel, Input, Spinner, Text } from "@chakra-ui/react"
import { numberToArray } from "@walletconnect/encoding"
import { setMaxListeners } from "events"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"

export const MaxForm = ({ tokenId }: { tokenId: string }) => {
  const [max, setMax] = useState<Maybe<number>>(null)
  const { roContract, rwContract } = useWeb3()

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
console.log({rwContract})
    const tx = await rwContract.setMax(tokenId, max)
    await tx.wait()
  }, [rwContract])

  return (
    <Flex 
      as="form"
      onSubmit={save}
    >
      <FormControl display="flex" mt={3}>
        <FormLabel whiteSpace="pre"_after={{ content: '":"' }}>
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
            ml={{ base: 0, md: 4 }}
            value={max}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              console.log({value, n: Number(value)})
              setMax(Number(value))
            }}
          />
        )}  
      </FormControl>
      <Button colorScheme="blue" type="submit">
        Set Max
      </Button>
    </Flex>
)
}