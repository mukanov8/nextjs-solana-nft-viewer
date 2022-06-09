import { Nft } from '@src/types'
import { OrderBy } from '@src/enums'

// sort/order nfts according to the following rules:
// 1. bookmarkedTime
// 2. creation time or last transaction time

export const getOrderedNfts = (nfts: Nft[], orderBy: OrderBy) => {
  const bookmarkedNfts = nfts.filter((nft) => nft.isBookmarked)
  const unbookmarkedNfts = nfts.filter((nft) => !nft.isBookmarked)
  const sortedBookmarkedNfts = bookmarkedNfts.sort((a, b) => {
    if (a.bookmarkedTime < b.bookmarkedTime) {
      return -1
    }
    if (a.bookmarkedTime > b.bookmarkedTime) {
      return 1
    }
    return 0
  })
  const sortedUnbookmarkedNfts = unbookmarkedNfts.sort((a, b) => {
    if (orderBy === OrderBy.CreationTime) {
      if (a.creationTime < b.creationTime) {
        return -1
      }
      if (a.creationTime > b.creationTime) {
        return 1
      }
      return 0
    }
    if (a.lastTransactionTime < b.lastTransactionTime) {
      return -1
    }
    if (a.lastTransactionTime > b.lastTransactionTime) {
      return 1
    }
    return 0
  })
  return [...sortedBookmarkedNfts, ...sortedUnbookmarkedNfts]
}
