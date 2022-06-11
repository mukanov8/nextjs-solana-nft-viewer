import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import MainHeading from '@src/components/main-heading/main-heading'
import { validatePublicKey } from '@src/utils/validatePublicKey'
import { useSetRecoilState } from 'recoil'
import { publicKeyState } from '@src/stores/nft.store'

const SearchPage: NextPage = () => {
  const APP_NAME = process.env.APP_NAME || 'NFT Viewer'

  const router = useRouter()

  const [publicKeyInput, setPublicKeyInput] = useState('')
  const setPublicKey = useSetRecoilState(publicKeyState)

  const isValidPublicKeyInput = publicKeyInput.length > 1 && validatePublicKey(publicKeyInput)
  const [isInvalidShown, setIsInvalidShown] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKeyInput(event.target.value)
    setIsInvalidShown(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (isValidPublicKeyInput) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(`/viewer/${publicKeyInput}`)
      setPublicKey(publicKeyInput)
    } else setIsInvalidShown(true)
  }

  return (
    <>
      <MainHeading mb="40px">{APP_NAME}</MainHeading>
      <InputGroup as="form" onSubmit={handleSubmit} w={['100%', '50%']} mb="40px" minW={['unset', '500px']}>
        <Input
          value={publicKeyInput}
          onChange={handleInputChange}
          placeholder="Search using public key"
          focusBorderColor="primary"
          isInvalid={isInvalidShown}
        />
        <InputRightElement children={<SearchIcon color="primary" />} cursor="pointer" onClick={handleSubmit} />
      </InputGroup>
      {isInvalidShown && (
        <Text>
          <b>{publicKeyInput} </b>is not a valid public key{' '}
        </Text>
      )}
    </>
  )
}

export default SearchPage
