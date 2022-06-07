/* eslint-disable no-console */
import { Box, Text, Img, useColorModeValue, Skeleton, Link } from '@chakra-ui/react'
import useFetch from '@src/hooks/useFetch'
import { ParsedNftType } from '@src/types'
import React from 'react'

interface Props {
  nft: ParsedNftType
}

const NftItem: React.FC<Props> = ({ nft }) => {
  const bg = useColorModeValue('unset', 'whiteAlpha.200')
  const hoverBg = useColorModeValue('unset', 'whiteAlpha.300')

  // nft image url data
  const { data, loading } = useFetch(nft.uri)

  return (
    <a href={`https://solscan.io/token/${nft.mint}`}>
      <Box
        w="220px"
        borderRadius="16px"
        bg={bg}
        transition="transform linear .2s"
        _hover={{ bg: hoverBg, transform: 'scale(1.05)', boxShadow: '2xl' }}
        boxShadow="xl"
        cursor="pointer"
      >
        <Skeleton isLoaded={!loading} borderRadius="16px">
          <Img w="100%" height="200px" objectFit="cover" src={data?.image} alt={nft.name} borderRadius="16px" />
        </Skeleton>
        <Box p="12px">
          <Text fontSize="lg">{nft.name}</Text>
          <Text fontSize="sm">
            Creator:
            {nft.creators.map((creator) => (
              <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {creator.address}
              </Text>
            ))}
          </Text>
        </Box>
      </Box>
    </a>
  )
}

export default NftItem
