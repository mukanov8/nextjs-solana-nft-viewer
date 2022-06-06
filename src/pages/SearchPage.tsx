import React, { useMemo, useState } from 'react'
import { Center, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { nftReadOnlyState, publicKeyState } from '../stores/nft.store'
import { validatePublicKey } from '../helpers/validatePublicKey'

const SearchPage = () => {
  const setPublicKey = useSetRecoilState(publicKeyState)
  const pubKey = useRecoilValue(publicKeyState)
  const [publicKeyInput, setPublicKeyInput] = useState<string>('')
  const nfts = useRecoilValue(nftReadOnlyState)

  const isValidPublicKeyInput = useMemo(
    () => publicKeyInput.length > 1 && validatePublicKey(publicKeyInput),
    [publicKeyInput]
  )

  console.log({ nfts })

  const handleSubmit = (event: React.FormEvent) => {
    console.log('submit')
    event.preventDefault()
    if (isValidPublicKeyInput) setPublicKey(publicKeyInput)
    else alert('Invalid public key 1')
    console.log({ pubKey })
  }

  return (
    <Center w="100%" h="100%" flexDir="column">
      <Heading mb="40px">NFT Viewer</Heading>
      <form onSubmit={handleSubmit}>
        <InputGroup w={['100%', '50%']} mb="40px" minW={['unset', '500px']} mx="16px">
          <Input
            value={publicKeyInput}
            onChange={e => {
              setPublicKeyInput(e.target.value)
              console.log({ publicKeyInput })
            }}
            placeholder="Search using public key"
            focusBorderColor="primary"
          />
          <InputRightElement children={<SearchIcon color="primary" />} onClick={handleSubmit} />
        </InputGroup>
      </form>
      {/* render heading with isValid if isValid is false */}
      {!isValidPublicKeyInput && <Text>{publicKeyInput} is not valid public key</Text>}({nfts})
      {/* <React.Suspense fallback="Loading NFTs..." /> */}
    </Center>
  )
}

export default SearchPage
