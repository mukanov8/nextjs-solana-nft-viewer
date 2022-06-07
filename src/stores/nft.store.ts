import { programs } from '@metaplex/js'
import { clusterApiUrl, Connection } from '@solana/web3.js'
import { atom, selectorFamily } from 'recoil'

export const publicKeyState = atom<string>({
  key: 'publicKeyState',
  default: '',
})

// export const nftReadOnlyState = selector({
//   key: 'nftReadOnlyState',
//   get: async ({ get }) => {
//     const publicKey = get(publicKeyState)
//     if (isValidPublicKey(publicKey)) {
//       try {
//         const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
//         return await programs.metadata.Metadata.findByOwnerV2(connection, publicKey)
//       } catch (error) {
//         // eslint-disable-next-line no-console
//         console.log('error in nftReadOnlyState')
//         return []
//       }
//     }
//     // eslint-disable-next-line no-alert
//     alert('Invalid public key')
//     return []
//   },
// })

export const nftReadOnlyQuery = selectorFamily({
  key: 'nftReadOnlyQuery',
  get: (publicKey: string) => async () => {
    try {
      // ref: https://www.abiraja.com/blog/querying-solana-blockchain
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
      return await programs.metadata.Metadata.findDataByOwner(connection, publicKey)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error in nftReadOnlyQuery')
      return []
    }
  },
})

// export const parsedNftReadOnlyQuery = selectorFamily({
//   key: 'parsedNftReadOnlyQuery',
//   get: (nfts: Metadata[]) => () => {
//     try {
//       return nfts.map((nft) => {
//         const { mint } = nft
//         const { uri, name } = nft.data
//         return {
//           mint,
//           name,
//           creators: nft.data.creators,
//           uri,
//         } as ParsedNftType
//       })
//     } catch (error) {
//       // eslint-disable-next-line no-console
//       console.log('error in parsedNftReadOnlyQuery')
//       return []
//     }
//   },
// })
