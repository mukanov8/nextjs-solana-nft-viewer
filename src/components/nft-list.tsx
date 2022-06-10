/* eslint-disable no-console */
import React from 'react'
import NftItem from '@src/components/nft-item'
import { SimpleGrid } from '@chakra-ui/react'
import { getOrderedNfts } from '@src/utils/getOrderedNfts'
import { orderByState } from '@src/stores/nft.store'
import { useRecoilValue } from 'recoil'

interface Props {
  nfts: Metadata[]
}
const NftList: React.FC<Props> = ({ nfts }) => {
  console.log('nfts: ', nfts)
  const orderBy = useRecoilValue(orderByState)
  const orderedNfts = getOrderedNfts(nfts, orderBy)

  console.log('sortedNfts: ', orderedNfts)
  console.log('orderedBy: ', orderBy)

  return (
    <SimpleGrid
      minChildWidth="220px"
      minChildHeight="280px"
      spacing="40px"
      width="100%"
      height={['100%', 'unset']}
      mb="auto"
      justifyItems={['center', 'unset']}
      paddingBottom={['16px', '48px']}
    >
      {orderedNfts.map((nft, i) => (
        <NftItem nft={nft} key={nft.mint.toString()} />
      ))}
    </SimpleGrid>
  )
}

export default NftList
