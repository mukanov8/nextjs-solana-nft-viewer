/* eslint-disable no-console */
import { Box, Text, Img } from '@chakra-ui/react'
import React from 'react'

interface Props {
  nft: any
}

const Nft: React.FC<Props> = ({ nft }) => {
  console.log(nft, 'nft')
  console.log(nft.data)
  console.log(nft.data.creators)

  return (
    <Box w="220px" borderRadius="15px" bg="blackAlpha.300" cursor="pointer" onClick={() => console.log('nft clicked')}>
      <Img
        w="100%"
        height="200px"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.F-Rkkyw37XOEaASnK5q_LgHaGB%26pid%3DApi&f=1"
        alt={nft.data.data.name}
        borderRadius="15px"
      />
      <Box p="12px">
        <Text fontSize="lg">{nft.data.data.name}</Text>
        <Text fontSize="sm">
          Creator:{' '}
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {nft.data.creators}
          </Text>{' '}
        </Text>
      </Box>
    </Box>
  )
}

export default Nft
