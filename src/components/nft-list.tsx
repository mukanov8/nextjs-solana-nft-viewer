/* eslint-disable no-console */
import React from 'react'
import NftItem from '@src/components/nft-item'
import { SimpleGrid } from '@chakra-ui/react'
import { getParsedNfts } from '@src/utils/getParsedNfts'

interface Props {
  nfts: Metadata[]
}
const NftList: React.FC<Props> = ({ nfts }) => {
  console.log(nfts)
  const parsedNfts = getParsedNfts(nfts)

  return (
    <SimpleGrid minChildWidth="220px" spacing="40px" height="100%" width="100%">
      {parsedNfts.map((nft, i) => (
        <NftItem nft={nft} key={i.toString()} />
      ))}
    </SimpleGrid>
  )
}

export default NftList
