import { atom, selector } from 'recoil'
import { searchPublicKey } from '../api/searchPublicKey'
import { validatePublicKey } from '../helpers/validatePublicKey'

export const publicKeyState = atom<string>({
  key: 'publicKeyState',
  default: '',
})

export const nftReadOnlyState = selector({
  key: 'nftReadOnlyState',
  get: async ({ get }) => {
    const publicKey = get(publicKeyState)
    console.log(publicKey, ';aasg')
    if (validatePublicKey(publicKey)) {
      const metadata = await searchPublicKey(publicKey)
      console.log(metadata)
      return metadata
    } else {
      alert('Invalid public key')
      return []
    }
  },
})
