import React, { useEffect } from 'react'
import { connectionState, parsedNftReadOnlyQuery } from '@src/stores/nft.store'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { Button, Center, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ViewerHeader from '@src/components/viewer-header'
import Error from '@src/components/error'
import NftList from '@src/components/nft-list'
import { clusterApiUrl, Connection } from '@solana/web3.js'

const ViewerPage = () => {
  const router = useRouter()
  const { key } = router.query

  const setConnection = useSetRecoilState(connectionState)

  useEffect(() => {
    setConnection(new Connection(clusterApiUrl('devnet'), 'confirmed'))
  }, [])

  const nftsLoadable = useRecoilValueLoadable(parsedNftReadOnlyQuery(key as string))
  const nfts = nftsLoadable.state === 'hasValue' ? nftsLoadable.contents : []

  return (
    <Flex w="100%" h="100%" flexDir="column">
      <ViewerHeader />
      <Flex py={['20px', '40px']} gap="16px">
        <Button>Last transaction time</Button>
        <Button>Last creation time</Button>
      </Flex>
      <Center h="100%">
        {nftsLoadable.state === 'loading' && <Spinner />}
        {nftsLoadable.state === 'hasError' && <Error />}
        {nftsLoadable.state === 'hasValue' && <NftList nfts={nfts} />}
      </Center>
    </Flex>
  )
}

export default ViewerPage
