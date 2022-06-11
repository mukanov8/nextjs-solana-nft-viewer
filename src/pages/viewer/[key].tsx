import React, { useEffect } from 'react'
import { bookmarksState, connectionState, nftsWithBookmarksReadOnlyState, orderByState } from '@src/stores/nft.store'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button, Center, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ViewerHeader from '@src/components/viewer-header'
import Error from '@src/components/error'
import NftList from '@src/components/nft-list'
import { clusterApiUrl, Connection } from '@solana/web3.js'
import { OrderBy } from '@src/enums'

const ViewerPage = () => {
  const router = useRouter()

  const setConnection = useSetRecoilState(connectionState)

  useEffect(() => {
    setConnection(new Connection(clusterApiUrl('devnet'), 'confirmed'))
  }, [])

  const nftsLoadable = useRecoilValueLoadable(nftsWithBookmarksReadOnlyState)
  const nfts = nftsLoadable.state === 'hasValue' ? nftsLoadable.contents : []

  const [orderBy, setOrderBy] = useRecoilState(orderByState)
  const bookmarks = useRecoilValue(bookmarksState)
  const resetBookmarks = useResetRecoilState(bookmarksState)

  return (
    <Flex w="100%" h="100%" flexDir="column">
      <ViewerHeader />
      <Flex py={['20px', '40px']} gap="16px" flexDir={['column', 'row']}>
        <Button
          onClick={() => setOrderBy(OrderBy.LastTransactionTime)}
          isActive={orderBy === OrderBy.LastTransactionTime}
        >
          Last transaction time
        </Button>
        <Button onClick={() => setOrderBy(OrderBy.CreationTime)} isActive={orderBy === OrderBy.CreationTime}>
          Last creation time
        </Button>
        {bookmarks.length > 0 && (
          <Button ml={['unset', 'auto']} colorScheme="red" onClick={resetBookmarks}>
            Clear bookmarks
          </Button>
        )}
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
