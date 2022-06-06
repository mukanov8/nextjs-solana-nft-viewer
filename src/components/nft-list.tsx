/* eslint-disable no-console */
import React from 'react'
import Nft from '@src/components/nft'
import { Wrap, WrapItem } from '@chakra-ui/react'

interface Props {
  nfts: Metadata[]
}
const NftList: React.FC<Props> = ({ nfts }) => {
  console.log(nfts)

  return (
    <Wrap spacing="48px" h="100%">
      {nfts.map((nft) => (
        <WrapItem key={nft.data.mint.toString()}>
          <Nft nft={nft} />{' '}
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default NftList
