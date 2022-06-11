/* eslint-disable no-console */
import React from 'react'
import NftItem from '@src/components/nft-item'
import { SimpleGrid } from '@chakra-ui/react'
import { getOrderedNfts } from '@src/utils/getOrderedNfts'
import { orderByState } from '@src/stores/nft.store'
import { useRecoilValue } from 'recoil'
import { Nft } from '@src/types'

interface Props {
  nfts: Nft[]
}
const NftList: React.FC<Props> = ({ nfts }) => {
  const orderBy = useRecoilValue(orderByState)
  const orderedNfts = getOrderedNfts(nfts, orderBy)

  // console.log('nfts: ', nfts)
  // console.log('orderedNfts: ', orderedNfts)

  return (
    <SimpleGrid
      minChildWidth="220px"
      spacing="40px"
      width="100%"
      height={['100%', 'unset']}
      mb="auto"
      justifyItems={['center', 'unset']}
      paddingBottom={['16px', '48px']}
    >
      {orderedNfts.map((nft) => (
        <NftItem nft={nft} key={nft.mint.toString()} />
      ))}
    </SimpleGrid>
  )
}

export default NftList
