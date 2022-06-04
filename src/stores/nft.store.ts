import { atom, selector } from 'recoil'
import { searchPublicKey } from '../api/searchPublicKey'

// export const nftState = atom<[]>({
//   key: 'nftState',
//   default: [],
// })

export const publicKeyState = atom<string>({
  key: 'publicKeyState',
  default: '',
})

export const nftReadOnlyState = selector({
  key: 'nftReadOnlyState',
  get: ({ get }) => {
    const publicKey = get(publicKeyState)
    const metadata = searchPublicKey(publicKey)
    console.log('aaa')
    return metadata
  },
})
