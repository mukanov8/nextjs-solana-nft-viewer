import { ParsedNftType } from '@src/types'

// TODO: need to include transcation/creation timestamps
export const getParsedNfts = (nfts: Metadata[]) => {
  return nfts.map((nft) => {
    const { mint } = nft
    const { uri, name } = nft.data
    return {
      mint,
      name,
      creators: nft.data.creators,
      uri,
    } as ParsedNftType
  })
}
