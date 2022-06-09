/* eslint-disable no-console */
import { programs } from '@metaplex/js'
import { Connection, PublicKey } from '@solana/web3.js'
import { ParsedNftType } from '@src/types'
import { atom, selectorFamily } from 'recoil'

export const publicKeyState = atom<string>({
  key: 'publicKeyState',
  default: '',
})

export const connectionState = atom<Connection | null>({
  key: 'connectionState',
  default: null,
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
        console.log('error in nftReadOnlyQuery')
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

        if (!connection) {
          console.log('Connection is not open')
          return []
        }

        const parsedNfts = nfts.map(async (nft) => {
          try {
            const { mint } = nft
            const { uri, name } = nft.data
            const signature = await connection.getSignaturesForAddress(new PublicKey(mint))
            const time = signature.map((el) => new Date(el.blockTime || 0))
            // console.log('time: ', time)

            return {
              mint,
              name,
              creators: nft.data.creators,
              uri,
              time,
            } as ParsedNftType
          } catch (error) {
            console.log(error, 'error in parsing nfts')
            return {} as ParsedNftType
          }
        })

        return await Promise.all(parsedNfts)
      } catch (error) {
        console.log(error, 'error in parsedNftReadOnlyQuery')
        return []
      }
    },
})
