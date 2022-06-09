/* eslint-disable no-console */
import React from 'react'
import { Box, Text, Img, useColorModeValue, Skeleton } from '@chakra-ui/react'
import useFetch from '@src/hooks/useFetch'
import { Nft } from '@src/types'
import { formatCreatorName } from '@src/utils/formatCreatorName'
import { StarFill24, Star24 } from '@chakra-icons/octicons'
import { bookmarksState } from '@src/stores/nft.store'
import { useRecoilState } from 'recoil'

interface Props {
  nft: Nft
}

const NftItem: React.FC<Props> = ({ nft }) => {
  const bg = useColorModeValue('unset', 'whiteAlpha.200')
  const hoverBg = useColorModeValue('unset', 'whiteAlpha.300')

  // nft image url data
  const { data, loading } = useFetch(nft.uri)
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksState)

  const handleBookmarkClick = () => {
    const isBookmarked = bookmarks.some((bookmark) => bookmark.mint === nft.mint)
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.mint !== nft.mint))
    } else {
      setBookmarks([...bookmarks, { mint: nft.mint, timestamp: new Date() }])
    }
  }

  return (
    <Box
      w="220px"
      borderRadius="16px"
      bg={bg}
      transition="transform linear .2s"
      _hover={{ bg: hoverBg, transform: 'scale(1.05)', boxShadow: '2xl' }}
      boxShadow="xl"
      cursor="pointer"
      position="relative"
    >
      {nft.isBookmarked ? (
        <StarFill24
          right="16px"
          top="16px"
          color="yellow.400"
          position="absolute"
          w="24px"
          h="24px"
          onClick={handleBookmarkClick}
        />
      ) : (
        <Star24
          right="16px"
          top="16px"
          color="gray.100"
          position="absolute"
          w="24px"
          h="24px"
          onClick={handleBookmarkClick}
        />
      )}
      <a href={`https://solscan.io/token/${nft.mint}`}>
        <Skeleton isLoaded={!loading} borderRadius="16px">
          <Img w="100%" height="200px" objectFit="cover" src={data?.image} alt={nft.name} borderRadius="16px" />
        </Skeleton>
        <Box p="12px">
          <Text fontSize="lg">{nft.name}</Text>
          <Text fontSize="sm">Creator: {nft.creators && formatCreatorName(nft.creators[0].address)}</Text>
        </Box>
      </a>
    </Box>
  )
}

export default NftItem
