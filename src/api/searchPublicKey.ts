import { Connection, clusterApiUrl } from '@solana/web3.js'
import { programs } from '@metaplex/js'

export const searchPublicKey = async (publicKey: string) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  const metadata = await programs.metadata.Metadata.findByOwnerV2(connection, publicKey)

  console.log(metadata)
  return metadata
}

// https://www.abiraja.com/blog/querying-solana-blockchain
