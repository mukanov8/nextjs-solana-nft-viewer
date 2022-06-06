import React from 'react'
import { nftReadOnlyQuery } from '@src/stores/nft.store'
import { useRecoilValueLoadable } from 'recoil'
import { Button, Center, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ViewerHeader from '@src/components/viewer-header'
import Error from '@src/components/error'

import NftList from '@src/components/nft-list'

const ViewerPage = () => {
  const router = useRouter()
  const { key } = router.query

  const nftsLoadable = useRecoilValueLoadable(nftReadOnlyQuery(key as string))
  const nfts = nftsLoadable.state === 'hasValue' ? nftsLoadable.contents : []

  return (
    <Flex w="100%" h="100%" flexDir="column">
      <ViewerHeader />
      <Flex py="40px" gap="16px">
        <Button>Last transaction time</Button>
        <Button>Last creation time</Button>
      </Flex>
      <Center h="100%" overflowX="hidden" overflowY="auto">
        {nftsLoadable.state === 'loading' && <Spinner />}
        {nftsLoadable.state === 'hasError' && <Error />}
        {nftsLoadable.state === 'hasValue' && <NftList nfts={nfts} />}
      </Center>
    </Flex>
  )
}

export default ViewerPage
