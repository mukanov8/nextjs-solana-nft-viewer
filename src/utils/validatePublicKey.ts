import { PublicKey } from '@solana/web3.js'

/** 
  https://stackoverflow.com/questions/71200948/how-can-i-validate-a-solana-wallet-address-with-web3js
*/
export const validatePublicKey = (key: string): boolean => {
  try {
    const publicKey = new PublicKey(key).toBuffer()
    return PublicKey.isOnCurve(publicKey)
  } catch (error) {
    return false
  }
}
