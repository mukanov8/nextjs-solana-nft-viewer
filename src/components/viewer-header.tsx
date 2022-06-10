import React, { useEffect, useState } from 'react'
import { Flex, Heading, Input, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react'
import { validatePublicKey } from '@src/utils/validatePublicKey'
import { publicKeyState } from '@src/stores/nft.store'
import { useRecoilState } from 'recoil'
import { SearchIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const ViewerHeader = () => {
  const APP_NAME = process.env.APP_NAME || 'NFT Viewer'
  const router = useRouter()
  const { key } = router.query

  const [publicKey, setPublicKey] = useRecoilState(publicKeyState)

  useEffect(() => {
    if (key && validatePublicKey(key as string)) {
      setPublicKey(key as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const isValidPublicKeyInput = publicKey.length > 1 && validatePublicKey(publicKey)
  const [isInvalidShown, setIsInvalidShown] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value)
    setIsInvalidShown(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isValidPublicKeyInput) router.replace(`/viewer/${publicKey}`)
    else setIsInvalidShown(true)
  }

  return (
    <Flex flexDir={['column', 'row']} w="100%" gap={['16px', 'unset']}>
      <NextLink href="/" passHref>
        <Heading as="a" size="lg">
          {APP_NAME}
        </Heading>
      </NextLink>
      <Tooltip label={`${publicKey} is not a valid key`} placement="top" isOpen={isInvalidShown}>
        <InputGroup as="form" onSubmit={handleSubmit} w={['100%', '60%']} minW={['unset', '500px']} mx="auto">
          <Input
            value={publicKey}
            onChange={handleInputChange}
            placeholder="Search using public key"
            focusBorderColor="primary"
            isInvalid={isInvalidShown}
          />
          <InputRightElement cursor="pointer" children={<SearchIcon color="primary" />} onClick={handleSubmit} />
        </InputGroup>
      </Tooltip>
    </Flex>
  )
}

export default ViewerHeader
