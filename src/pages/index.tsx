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
  const EXAMPLE_DEVNET_KEYS = [process.env.EXAMPLE_DEVNET_KEY_1, process.env.EXAMPLE_DEVNET_KEY_2]
  const hasExampleDevnetKeys = EXAMPLE_DEVNET_KEYS.every((key) => !!key)

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
      <MainHeading>{APP_NAME}</MainHeading>
      <InputGroup as="form" onSubmit={handleSubmit} w={['100%', '50%']} my="40px" minW={['unset', '500px']}>
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
        <>
          <Text mb="12px">
            <b>{publicKeyInput} </b>is not a valid public key{' '}
          </Text>
          <Text mb="4px">You can use devnet keys below for testing:</Text>
          {hasExampleDevnetKeys ? (
            EXAMPLE_DEVNET_KEYS.map(
              (key) =>
                key && (
                  <Text key={key} color="primary" mb="4px">
                    {key}
                  </Text>
                )
            )
          ) : (
            <Text color="primary" mb="4px">
              No devnet keys available at the moment:(
            </Text>
          )}
        </>
      )}
    </>
  )
}

export default SearchPage
