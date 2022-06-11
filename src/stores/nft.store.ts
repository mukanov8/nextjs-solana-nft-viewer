/* eslint-disable no-console */
import { programs } from '@metaplex/js'
import { Connection, PublicKey } from '@solana/web3.js'
import { Bookmark, Nft } from '@src/types'
import { OrderBy } from '@src/enums'
import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
// Recoil's Local Storage Persistence (https://recoiljs.org/docs/guides/atom-effects/#local-storage-persistence) can also be implemented, but I decided to use recoil-persist instead to save time
const { persistAtom } = recoilPersist()

export const publicKeyState = atom<string>({
  key: 'publicKeyState',
  default: '',
})

export const connectionState = atom<Connection | null>({
  key: 'connectionState',
  default: null,
})

export const bookmarksState = atom<Bookmark[]>({
  key: 'bookmarksState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const orderByState = atom<OrderBy>({
  key: 'orderByState',
  default: OrderBy.LastTransactionTime,
  effects_UNSTABLE: [persistAtom],
})

export const nftsReadOnlyQuery = selector({
  key: 'nftsReadOnlyQuery',
  get: async ({ get }) => {
    try {
      console.log('nftsReadOnlyQuery is called')
      // ref: https://www.abiraja.com/blog/querying-solana-blockchain
      const connection = get(connectionState)
      const publicKey = get(publicKeyState)

      if (!connection) {
        console.log('Connection is not open')
        return []
      }
      const nftMetadata = await programs.metadata.Metadata.findDataByOwner(connection, publicKey)

      const nfts = nftMetadata.map(async (nft) => {
        try {
          const { mint } = nft
          const { uri, name } = nft.data
          /*
              https://docs.solana.com/integrations/exchange.
              https://www.quicknode.com/docs/solana/getSignaturesForAddress
              Returns confirmed signatures for transactions involving an address backwards in time from the provided signature or most recent confirmed block.
              Arbitrary limit of 100.
            */
          const signatures = await connection.getSignaturesForAddress(new PublicKey(mint), { limit: 100 })
          const time = signatures.map((el) => new Date(el.blockTime || 0))
          console.log(name, ' times:', time)
          return {
            mint,
            name,
            creators: nft.data.creators,
            uri,
            creationTime: time.at(-1),
            lastTransactionTime: time[0],
          } as Omit<Nft, 'isBookmarked' | 'bookmarkedTime'>
        } catch (error) {
          console.log(error, 'error in parsing nfts')
          return {} as Omit<Nft, 'isBookmarked' | 'bookmarkedTime'>
        }
      })
      return await Promise.all(nfts)
    } catch (error) {
      console.log(error, 'error in nftReadOnlyState')
      return []
    }
  },
})

/*  
  Note: 
  1. try catch is used here to be able to use this state with useRecoilValueLoadable in viewer.tsx 
  2. Having a separate state for bookmarked Nfts prevents re-querying the nft data (nftsReadOnlyQuery) when the user clicks on the bookmark icon
*/
export const nftsWithBookmarksReadOnlyState = selector({
  key: 'nftsWithBookmarksReadOnlyState',
  get: ({ get }) => {
    try {
      console.log('nftsWithBookmarks is called')
      const nfts = get(nftsReadOnlyQuery)
      const bookmarks = get(bookmarksState)
      return nfts.map((nft) => {
        const bookmark = bookmarks.find((el) => el.mint === nft.mint)
        return {
          ...nft,
          isBookmarked: !!bookmark,
          bookmarkedTime: bookmark?.timestamp,
        } as Nft
      })
    } catch (error) {
      console.log(error, 'error in nftsWithBookmarksReadOnlyState')
      return []
    }
  },
})
