/* eslint-disable no-console */
import { programs } from '@metaplex/js'
import { Connection, PublicKey } from '@solana/web3.js'
import { Bookmark, Nft } from '@src/types'
import { OrderBy } from '@src/enums'

import { atom, selectorFamily } from 'recoil'

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
})

export const orderByState = atom<OrderBy>({
  key: 'orderByState',
  default: OrderBy.LastTransactionTime,
})

export const nftReadOnlyQuery = selectorFamily({
  key: 'nftReadOnlyQuery',
  get:
    (publicKey: string) =>
    async ({ get }) => {
      try {
        // ref: https://www.abiraja.com/blog/querying-solana-blockchain
        const connection = get(connectionState)
        // const key = get(publicKeyState)
        if (!connection) {
          console.log('Connection is not open')
          return []
        }

        return await programs.metadata.Metadata.findDataByOwner(connection, publicKey)
      } catch (error) {
        console.log(error, 'error in nftReadOnlyQuery')
        return []
      }
    },
})

export const parsedNftReadOnlyQuery = selectorFamily({
  key: 'parsedNftReadOnlyQuery',
  get:
    (publicKey: string) =>
    async ({ get }) => {
      try {
        const connection = get(connectionState)
        // const key = get(publicKeyState)
        const nfts = get(nftReadOnlyQuery(publicKey))
        const bookmarks = get(bookmarksState)

        if (!connection) {
          console.log('Connection is not open')
          return []
        }

        const parsedNfts = nfts.map(async (nft) => {
          try {
            const { mint } = nft
            const { uri, name } = nft.data
            /*
              https://docs.solana.com/integrations/exchange.
              https://www.quicknode.com/docs/solana/getSignaturesForAddress
              Returns confirmed signatures for transactions involving an address backwards in time from the provided signature or most recent confirmed block.
              Arbitrary limit of 100.
            */
            const signature = await connection.getSignaturesForAddress(new PublicKey(mint), { limit: 100 })
            const time = signature.map((el) => new Date(el.blockTime || 0))
            const bookmark = bookmarks.find((el) => el.mint === mint)
            console.log('time: ', time)

            return {
              mint,
              name,
              creators: nft.data.creators,
              uri,
              // TODO: implement bookmark
              isBookmarked: !!bookmark,
              bookmarkedTime: bookmark?.timestamp,
              creationTime: time[-1],
              lastTransactionTime: time[0],
            } as Nft
          } catch (error) {
            console.log(error, 'error in parsing nfts')
            return {} as Nft
          }
        })

        return await Promise.all(parsedNfts)
      } catch (error) {
        console.log(error, 'error in parsedNftReadOnlyQuery')
        return []
      }
    },
})
