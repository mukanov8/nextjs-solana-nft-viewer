import React from 'react'
import { Center, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import { publicKeyState } from '../stores/nft.store'

const SearchPage = () => {
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState)

  return (
    <Center w="100%" h="100%" flexDir="column">
      <Heading mb="40px">NFT Viewer</Heading>
      <InputGroup w={['100%', '50%']} mb="40px" minW={['unset', '500px']} mx="16px">
        <Input
          value={publicKey}
          onChange={e => setPublicKey(e.target.value)}
          placeholder="Search using public key"
          focusBorderColor="primary"
        />
        <InputRightElement children={<SearchIcon color="primary" />} />
      </InputGroup>
      <React.Suspense fallback="Loading NFTs..." />
    </Center>
  )
}

export default SearchPage
