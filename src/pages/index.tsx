import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import MainHeading from '@src/components/main-heading/main-heading'
import { validatePublicKey } from '@src/utils/validatePublicKey'

const SearchPage: NextPage = () => {
  const { APP_NAME } = process.env
  const router = useRouter()
  const [publicKey, setPublicKey] = useState('')
  const isValidPublicKeyInput = publicKey.length > 1 && validatePublicKey(publicKey)
  const [isInvalidShown, setIsInvalidShown] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value)
    setIsInvalidShown(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isValidPublicKeyInput) router.push(`/viewer/${publicKey}`)
    else setIsInvalidShown(true)
  }

  return (
    <>
      <MainHeading mb="40px">{APP_NAME}</MainHeading>
      <InputGroup as="form" onSubmit={handleSubmit} w={['100%', '50%']} mb="40px" minW={['unset', '500px']}>
        <Input
          value={publicKey}
          onChange={handleInputChange}
          placeholder="Search using public key"
          focusBorderColor="primary"
          isInvalid={isInvalidShown}
        />
        <InputRightElement children={<SearchIcon color="primary" />} cursor="pointer" onClick={handleSubmit} />
      </InputGroup>
      {isInvalidShown && (
        <Text>
          <b>{publicKey} </b>is not a valid public key{' '}
        </Text>
      )}
    </>
  )
}

export default SearchPage
